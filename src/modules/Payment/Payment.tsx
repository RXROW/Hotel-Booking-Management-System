import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Grid,
  Button,
  Divider,
  Paper,
  useTheme,
} from '@mui/material'
import {
  AddressElement,
  CardElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'
import { toast } from 'react-toastify'
import CardImg from '../../assets/imges/Plain credit card-bro.png'
import ConfirmationImg from '../../assets/imges/Successful purchase-pana.png'
import FailureImg from '../../assets/imges/No data-bro.png'
import { useLocation, useNavigate } from 'react-router-dom'
import { privateInstance } from '../../services/apis/apisConfig'
import { BOOKING_URL_USER } from '../../services/apis/apisUrls'
import Commonheader from '../shared/components/commonheader/Commonheader'

export default function Payment() {
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const cardElementOptions = {
    style: {
      base: {
        color: theme.palette.mode === 'light' ? '#152C5B' : '#fff',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color:
            theme.palette.mode === 'light'
              ? 'rgba(0, 0, 0, 0.6)'
              : 'rgba(255, 255, 255, 0.5)',
        },
        backgroundColor: 'transparent',
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  }

  const addressElementOptions: { mode: 'billing'; appearance: any } = {
    mode: 'billing',
    appearance: {
      theme: theme.palette.mode === 'light' ? 'stripe' : 'night',
      variables: {
        colorPrimary: theme.palette.primary.main,
        colorBackground: theme.palette.mode === 'light' ? '#f5f5f5' : '#1e1e1e',
        colorText: theme.palette.mode === 'light' ? '#152C5B' : '#fff',
        colorTextSecondary:
          theme.palette.mode === 'light' ? '#666666' : '#cccccc',
        colorTextPlaceholder:
          theme.palette.mode === 'light' ? '#888888' : '#999999',
        colorBackgroundText:
          theme.palette.mode === 'light' ? '#ffffff' : '#2d2d2d',
        borderRadius: '4px',
        spacingUnit: '4px',
      },
      rules: {
        '.Input': {
          backgroundColor:
            theme.palette.mode === 'light' ? '#ffffff' : '#2d2d2d',
          border: `1px solid ${theme.palette.mode === 'light' ? '#e0e0e0' : '#404040'}`,
        },
        '.Input:focus': {
          border: `2px solid ${theme.palette.primary.main}`,
        },
        '.Label': {
          color: theme.palette.mode === 'light' ? '#152C5B' : '#ffffff',
        },
        '.Error': {
          color: theme.palette.error.main,
        },
      },
    },
  }
  const [paymentSuccess, setPaymentSuccess] = useState<boolean | null>(null)
  const { bookingId } = location.state || {}

  const payBooking = async (bookingId: string, token: string) => {
    try {
      const res = await privateInstance.post(
        BOOKING_URL_USER.PAY_BOOKING(bookingId),
        { token: token },
      )
      setPaymentSuccess(true)
      toast.success(res?.data?.message)
      navigate('/payment-done')
    } catch (error) {
      setPaymentSuccess(false)
      toast.error('Payment failed. Please try again.')
    }
  }

  const paymentHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!elements || !stripe || !bookingId) return

    const cardElement = elements.getElement(CardElement)
    const addressElement = elements.getElement(AddressElement)

    if (!cardElement || !addressElement) {
      toast.error('Card or Address Element is missing.')
      return
    }

    const { token, error } = await stripe.createToken(cardElement)

    if (error || !token) {
      toast.error('Failed to generate payment token')
      return
    }

    payBooking(bookingId, token.id)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Box component="section" sx={{ px: { xs: 2, md: 8 }, py: 4 }}>
      <Commonheader />

      <Paper elevation={1} sx={{ p: { xs: 2, md: 4 } }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: 'center' }}>
              <img
                src={
                  paymentSuccess === null
                    ? CardImg
                    : paymentSuccess
                      ? ConfirmationImg
                      : FailureImg
                }
                alt="Step Visual"
                style={{ width: '100%', maxWidth: '400px' }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <form onSubmit={paymentHandler}>
              <Box mb={3}>
                <AddressElement options={addressElementOptions} />
              </Box>
              <Box mb={3}>
                <CardElement options={cardElementOptions} />
                <Divider sx={{ my: 3 }} />
                <Box display="flex" justifyContent="center">
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={!stripe || !elements}
                  >
                    Submit Payment
                  </Button>
                </Box>
              </Box>

              {paymentSuccess !== null && (
                <Typography
                  variant="h6"
                  align="center"
                  color={paymentSuccess ? 'success.main' : 'error.main'}
                >
                  {paymentSuccess
                    ? 'Payment Successful!'
                    : 'Payment Failed. Please Try Again.'}
                </Typography>
              )}
            </form>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}
