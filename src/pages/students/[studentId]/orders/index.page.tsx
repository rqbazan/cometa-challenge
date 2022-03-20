import * as React from 'react'
import Fade from '@mui/material/Fade'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { PaymentOrderData } from '~/entities'
import { KeysFormatter, MoneyFormatter } from '~/formatters'
import { MoneyProvider, useMoney, useStudentInfo, useStudentOrders } from '~/hooks'
import { httpClient } from '~/lib/http-client'
import { FloatingButton } from '~/ui/components'
import { MainLayout } from '~/ui/layouts'
import { createIndexedObj, isError, isLoading, reduceIdentifiables } from '~/utils'
import {
  DueCollapsibleFees,
  OutstandingCollapsibleFees,
  PaidCollapsibleFees,
  StyledForm,
  SummaryCard,
} from './components'
import { useCurrencyCode } from './hooks'
import { FormValues } from './types'

interface StudentOrdersFormProps {
  studentInfoQuery: ReturnType<typeof useStudentInfo>
  studentOrdersQuery: ReturnType<typeof useStudentOrders>
}

function useDefaultFormValues(orders: PaymentOrderData[]) {
  return React.useMemo(
    () => ({
      orderIds: reduceIdentifiables(orders, () => ({ selected: false })),
    }),
    [orders]
  )
}

function useIndexedObj(orders: PaymentOrderData[]) {
  return React.useMemo(() => createIndexedObj(orders), [orders])
}

function StudentOrdersForm({ studentInfoQuery, studentOrdersQuery }: StudentOrdersFormProps) {
  const { student } = studentInfoQuery

  const { paidOrders, outstandingOrders, dueOrders, payableOrders } = studentOrdersQuery

  const defaultFormValues = useDefaultFormValues(payableOrders)

  const indexedObj = useIndexedObj(payableOrders)

  const totalMoney = useMoney()

  const totalIsNotZero = totalMoney.amount > 0

  const form = useForm<FormValues>({
    defaultValues: defaultFormValues,
  })

  function onSubmit(formValues: FormValues) {
    console.log({ orderIds: formValues.orderIds })
  }

  return (
    <StyledForm onSubmit={form.handleSubmit(onSubmit)} extraPaddingBottom={totalIsNotZero}>
      <SummaryCard student={student!} />
      <PaidCollapsibleFees dataSource={paidOrders} />
      <OutstandingCollapsibleFees
        form={form}
        dataSource={outstandingOrders}
        indexedObj={indexedObj}
      />
      <DueCollapsibleFees form={form} dataSource={dueOrders} indexedObj={indexedObj} />
      <Fade in={totalIsNotZero}>
        <FloatingButton type="submit">{`Ir a pagar ${MoneyFormatter.toString(
          totalMoney
        )}`}</FloatingButton>
      </Fade>
    </StyledForm>
  )
}

export default function StudentOrdersPage() {
  const router = useRouter()

  const studentId = router.query.studentId as string

  const studentInfoQuery = useStudentInfo(studentId)

  const studentOrdersQuery = useStudentOrders(studentId)

  const currencyCode = useCurrencyCode(studentOrdersQuery.orders)

  // Actually don't required because of SSR
  if (isLoading(studentInfoQuery, studentOrdersQuery)) {
    return null
  }

  // Actually don't required because of SSR
  if (isError(studentInfoQuery, studentOrdersQuery)) {
    return null
  }

  return (
    <MainLayout title={studentInfoQuery.student!.school.name}>
      <Head>
        <title>Ordenes de Pago</title>
      </Head>
      <MoneyProvider currencyCode={currencyCode}>
        <StudentOrdersForm
          studentInfoQuery={studentInfoQuery}
          studentOrdersQuery={studentOrdersQuery}
        />
      </MoneyProvider>
    </MainLayout>
  )
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const studentId = query.studentId as string

  const studentInfoKey = KeysFormatter.getStudentInfo(studentId)
  const studentOrdersKey = KeysFormatter.getStudentOrders(studentId)

  const [studentInfo, studentOrders] = await Promise.all([
    httpClient.fetch(studentInfoKey),
    httpClient.fetch(studentOrdersKey),
  ])

  return {
    props: {
      swrFallback: {
        [studentInfoKey]: studentInfo,
        [studentOrdersKey]: studentOrders,
      },
    },
  }
}
