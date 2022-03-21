import * as React from 'react'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { PaymentOrderData } from '~/entities'
import { KeysFormatter } from '~/formatters'
import { MoneyProvider, useStudentInfo, useStudentOrders } from '~/hooks'
import { httpClient } from '~/lib/http-client'
import { MainLayout } from '~/ui/layouts'
import { createIndexedObj, isError, isLoading, reduceIdentifiables } from '~/utils'
import {
  DueCollapsibleFees,
  OrdersFormLayout,
  OutstandingCollapsibleFees,
  PaidCollapsibleFees,
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

  const form = useForm<FormValues>({
    defaultValues: defaultFormValues,
  })

  function onSubmit(formValues: FormValues) {
    console.log({ orderIds: formValues.orderIds })
  }

  return (
    <OrdersFormLayout onSubmit={form.handleSubmit(onSubmit)}>
      <SummaryCard student={student!} />
      <PaidCollapsibleFees dataSource={paidOrders} />
      <OutstandingCollapsibleFees
        form={form}
        dataSource={outstandingOrders}
        indexedObj={indexedObj}
      />
      <DueCollapsibleFees form={form} dataSource={dueOrders} indexedObj={indexedObj} />
    </OrdersFormLayout>
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
