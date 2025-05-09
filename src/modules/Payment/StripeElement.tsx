// @ts-nocheck
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Payment from './Payment'
import { useTheme } from '@mui/system'
export default function StripeElement() {
  const stripePromise = loadStripe(
    'pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8',
  )
  const theme = useTheme()
  const stripetheme: 'night' | 'light' =
    theme.palette.mode === 'dark' ? 'night' : 'light'

  const appearance = {
    theme: stripetheme,
    variables: {
      colorPrimary: theme.palette.primary.main,
      colorBackground: theme.palette.background.paper,
      colorText: theme.palette.text.primary,
      colorDanger: theme.palette.error.main,
    },
  }
  return (
    <Elements stripe={stripePromise} options={{ appearance }}>
      <Payment />
    </Elements>
  )
}
