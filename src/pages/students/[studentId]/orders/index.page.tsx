import * as React from 'react'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { KeysFormatter } from '~/formatters'
import { MoneyProvider, useStudentInfo, useStudentOrders } from '~/hooks'
import { httpClient } from '~/lib/http-client'
import { MainLayout } from '~/ui/layout'
import { isError, isLoading } from '~/utils'
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

const defaultFormValues: Partial<FormValues> = {
  outstandingOrderIds: [],
  dueOrderIds: [],
}

export default function StudentOrdersPage() {
  const router = useRouter()

  const studentId = router.query.studentId as string

  const studentInfoQuery = useStudentInfo(studentId)

  const studentOrdersQuery = useStudentOrders(studentId)

  const currencyCode = useCurrencyCode(studentOrdersQuery.orders)

  const form = useForm<FormValues>({
    defaultValues: defaultFormValues,
  })

  function onSubmit(formValues: FormValues) {
    console.log({
      outstandingOrderIds: formValues.outstandingOrderIds.filter(Boolean),
      dueOrderIds: formValues.dueOrderIds.filter(Boolean),
    })
  }

  // Actually don't required because of SSR
  if (isLoading(studentInfoQuery, studentOrdersQuery)) {
    return null
  }

  // Actually don't required because of SSR
  if (isError(studentInfoQuery, studentOrdersQuery)) {
    return null
  }

  const { student } = studentInfoQuery
  const { paidOrders, outstandingOrder, dueOrders } = studentOrdersQuery

  return (
    <MainLayout title={student!.school.name}>
      <MoneyProvider currencyCode={currencyCode}>
        <Head>
          <title>Ordenes de Pago</title>
        </Head>
        <StyledForm onSubmit={form.handleSubmit(onSubmit)}>
          <SummaryCard student={student!} />
          <PaidCollapsibleFees dataSource={paidOrders} />
          <OutstandingCollapsibleFees form={form} dataSource={outstandingOrder} />
          <DueCollapsibleFees form={form} dataSource={dueOrders} />
          <SubmitButton form={form} />
        </StyledForm>
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
