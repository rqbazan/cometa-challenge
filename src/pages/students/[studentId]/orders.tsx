import * as React from 'react'
import { DevTool } from '@hookform/devtools'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Fade from '@mui/material/Fade'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { useForm, UseFormReturn } from 'react-hook-form'
import { PaymentOrder, PaymentOrderData } from '~/entities'
import { CurrencyCode, Money } from '~/entities/money'
import { StudentData } from '~/entities/student'
import {
  MoneyProvider,
  useMoney,
  useMoneyOperations,
  useStudentInfo,
  useStudentOrders,
} from '~/hooks'
import {
  CollapsibleFees,
  DuePaymentOrderCard,
  FloatingButton,
  OutstandingPaymentOrderCard,
  PaidPaymentOrderCard,
  StudentSummary,
  TotalSummary,
} from '~/ui/components'
import { getMainLayout } from '~/ui/layout'
import { isError, isLoading } from '~/utils'

interface FormValues {
  outstandingOrderIds: string[]
  dueOrderIds: string[]
}

interface SummaryCardProps {
  student: StudentData
}

interface CustomCollapsibleFeesProps {
  form: UseFormReturn<FormValues>
  dataSource: PaymentOrderData[]
}

interface SubmitButtonProps {
  form: UseFormReturn<FormValues>
}

const selectionDisclaimerText = 'Puedes seleccionar más de uno'

const defaultFormValues: Partial<FormValues> = {
  outstandingOrderIds: [],
  dueOrderIds: [],
}

const StyledForm = styled('form')(props => ({
  padding: props.theme.spacing(2),
  '& > :not(:last-child)': {
    marginBottom: props.theme.spacing(2),
  },
}))

function useCheckboxOnChange() {
  const operations = useMoneyOperations()

  return (value: Money) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      operations.add(value)
    } else {
      operations.substract(value)
    }
  }
}

// FIXME: the currency code shouldn't depend on orders
function useCurrencyCode(orders?: PaymentOrderData[]) {
  const defaultCurrencyCode: CurrencyCode = 'USD'

  return React.useMemo<CurrencyCode>(() => {
    if (!Array.isArray(orders)) {
      return defaultCurrencyCode
    }

    const order = orders.find(order => order.price_currency)

    return order?.price_currency ?? defaultCurrencyCode
  }, [orders])
}

function SummaryCard({ student }: SummaryCardProps) {
  const total = useMoney()

  return (
    <Card>
      <CardContent>
        <StudentSummary
          firstName={student.first_name}
          lastName={student.last_name}
          cohort={student.cohort}
          gutterBottom
        />
        <TotalSummary value={total} />
      </CardContent>
    </Card>
  )
}

function OutstandingCollapsibleFees({ dataSource, form }: CustomCollapsibleFeesProps) {
  const getOnChange = useCheckboxOnChange()

  const outstandingOrderIds = form.watch('outstandingOrderIds')

  const someOutstandingOrderIsSelected = outstandingOrderIds.some(Boolean)

  return (
    <CollapsibleFees
      title="Cuotas pendientes"
      subtitle={someOutstandingOrderIsSelected ? null : selectionDisclaimerText}
    >
      {dataSource.map((order, index) => {
        const isDisabled = index === 0 ? false : !outstandingOrderIds[index - 1]
        const paymentOrder = new PaymentOrder(order)

        return (
          <OutstandingPaymentOrderCard
            key={order.id}
            paymentOrder={paymentOrder}
            checkboxProps={{
              ...form.register(`outstandingOrderIds.${index}`, {
                onChange: getOnChange(paymentOrder.price),
              }),
              disabled: isDisabled,
              value: order.id,
            }}
          />
        )
      })}
    </CollapsibleFees>
  )
}

function DueCollapsibleFees({ dataSource, form }: CustomCollapsibleFeesProps) {
  const getOnChange = useCheckboxOnChange()

  const [dueOrderIds, outstandingOrderIds] = form.watch(['dueOrderIds', 'outstandingOrderIds'])

  const allOutstandingOrdersSelected = outstandingOrderIds.every(Boolean)

  return (
    <CollapsibleFees
      title="Cuotas futuras"
      subtitle={allOutstandingOrdersSelected ? selectionDisclaimerText : null}
    >
      {dataSource.map((order, index) => {
        const isDisabled = index === 0 ? !allOutstandingOrdersSelected : !dueOrderIds[index - 1]
        const paymentOrder = new PaymentOrder(order)

        return (
          <DuePaymentOrderCard
            key={order.id}
            paymentOrder={paymentOrder}
            checkboxProps={{
              ...form.register(`dueOrderIds.${index}`, {
                onChange: getOnChange(paymentOrder.price),
              }),
              disabled: isDisabled,
              value: order.id,
            }}
          />
        )
      })}
    </CollapsibleFees>
  )
}

function PaidCollapsibleFees({ dataSource }: Omit<CustomCollapsibleFeesProps, 'form'>) {
  return (
    <CollapsibleFees title="Cuotas pagadas">
      {dataSource.map(order => (
        <PaidPaymentOrderCard key={order.id} paymentOrder={new PaymentOrder(order)} />
      ))}
    </CollapsibleFees>
  )
}

function SubmitButton({ form }: SubmitButtonProps) {
  const outstandingOrderIds = form.watch('outstandingOrderIds')
  const someOutstandingOrderIsSelected = outstandingOrderIds.some(Boolean)

  return (
    <Fade in={someOutstandingOrderIsSelected}>
      <FloatingButton type="submit">Ir a Pagar</FloatingButton>
    </Fade>
  )
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

  if (isLoading(studentInfoQuery, studentOrdersQuery)) {
    return null
  }

  if (isError(studentInfoQuery, studentOrdersQuery)) {
    return null
  }

  const { student } = studentInfoQuery
  const { paidOrders, outstandingOrder, dueOrders } = studentOrdersQuery

  return (
    <MoneyProvider currencyCode={currencyCode}>
      <StyledForm onSubmit={form.handleSubmit(onSubmit)}>
        <SummaryCard student={student!} />
        <PaidCollapsibleFees dataSource={paidOrders} />
        <OutstandingCollapsibleFees form={form} dataSource={outstandingOrder} />
        <DueCollapsibleFees form={form} dataSource={dueOrders} />
        <SubmitButton form={form} />
      </StyledForm>
      <DevTool placement="top-left" control={form.control} />
    </MoneyProvider>
  )
}

export async function getServerSideProps() {
  return { props: {} }
}

StudentOrdersPage.getLayout = getMainLayout
