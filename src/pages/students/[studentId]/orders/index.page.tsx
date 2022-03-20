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
import { fill, isError, isLoading } from '~/utils'
import {
  DueCollapsibleFees,
  OutstandingCollapsibleFees,
  PaidCollapsibleFees,
  StyledForm,
  SubmitButton,
  SummaryCard,
} from './components'
import { useCurrencyCode } from './hooks'
import { FormValues } from './types'

interface StudentOrdersFormProps {
  studentInfoQuery: ReturnType<typeof useStudentInfo>
  studentOrdersQuery: ReturnType<typeof useStudentOrders>
}

function useDefaultFormValues(
  outstandingOrders: PaymentOrderData[],
  dueOrders: PaymentOrderData[]
): Partial<FormValues> {
  return React.useMemo(
    () => ({
      outstandingOrderIds: fill(outstandingOrders, null),
      dueOrderIds: fill(dueOrders, null),
    }),
    [outstandingOrders, dueOrders]
  )
}

function StudentOrdersForm({ studentInfoQuery, studentOrdersQuery }: StudentOrdersFormProps) {
  const { student } = studentInfoQuery

  const { paidOrders, outstandingOrders, dueOrders } = studentOrdersQuery

  const currencyCode = useCurrencyCode(studentOrdersQuery.orders)

  const defaultFormValues = useDefaultFormValues(outstandingOrders, dueOrders)

  const form = useForm<FormValues>({
    defaultValues: defaultFormValues,
  })

  function onSubmit(formValues: FormValues) {
    console.log({
      outstandingOrderIds: formValues.outstandingOrderIds.filter(Boolean),
      dueOrderIds: formValues.dueOrderIds.filter(Boolean),
    })
  }

  return (
    <MoneyProvider currencyCode={currencyCode}>
      <StyledForm onSubmit={form.handleSubmit(onSubmit)}>
        <SummaryCard student={student!} />
        <PaidCollapsibleFees dataSource={paidOrders} />
        <OutstandingCollapsibleFees form={form} dataSource={outstandingOrders} />
        <DueCollapsibleFees form={form} dataSource={dueOrders} />
        <SubmitButton form={form} />
      </StyledForm>
    </MoneyProvider>
  )
}

export default function StudentOrdersPage() {
  const router = useRouter()

  const studentId = router.query.studentId as string

  const studentInfoQuery = useStudentInfo(studentId)

  const studentOrdersQuery = useStudentOrders(studentId)

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
      <StudentOrdersForm
        studentInfoQuery={studentInfoQuery}
        studentOrdersQuery={studentOrdersQuery}
      />
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
