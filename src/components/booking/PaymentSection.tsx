
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, ArrowRight, Check, Clock, User } from 'lucide-react';
import { format } from 'date-fns';

interface PaymentSectionProps {
  bookingData: any;
  updateBookingData: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const PaymentSection: React.FC<PaymentSectionProps> = ({ 
  bookingData, 
  updateBookingData, 
  onNext, 
  onPrev 
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showMpesaModal, setShowMpesaModal] = useState(false);
  const [paymentStep, setPaymentStep] = useState(1);

  const handlePayment = () => {
    if (!phoneNumber) return;
    
    setShowMpesaModal(true);
    setIsProcessing(true);
    setPaymentStep(1);

    // Simulate M-Pesa payment flow
    setTimeout(() => {
      setPaymentStep(2);
    }, 2000);

    setTimeout(() => {
      setPaymentStep(3);
    }, 4000);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentStep(4);
    }, 6000);
  };

  const handlePaymentSuccess = () => {
    setShowMpesaModal(false);
    updateBookingData({ 
      paymentStatus: 'completed',
      paymentMethod: 'mpesa',
      paymentPhone: phoneNumber,
      bookingReference: `TB${Date.now().toString().slice(-6)}`
    });
    onNext();
  };

  const breakdown = [
    { label: 'Base fare', amount: bookingData.selectedBus?.price[bookingData.class] * bookingData.passengers },
    { label: 'Service fee', amount: 50 * bookingData.passengers },
    { label: 'Payment processing', amount: 25 }
  ];

  const totalAmount = breakdown.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Payment Form */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg">
              <CardTitle className="text-2xl text-gray-800 flex items-center space-x-2">
                <span>💳</span>
                <span>Payment</span>
              </CardTitle>
              <p className="text-gray-600 mt-2">Complete your booking payment</p>
            </CardHeader>
            
            <CardContent className="p-8 space-y-6">
              {/* M-Pesa Payment */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 font-bold">M</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">M-Pesa Payment</h3>
                    <p className="text-sm text-gray-600">Pay using your mobile money</p>
                  </div>
                  <Badge className="ml-auto bg-green-100 text-green-600 border-green-200">
                    Recommended
                  </Badge>
                </div>

                <div className="pl-15 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      M-Pesa Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      placeholder="0700 123 456"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="h-11 border-2 focus:border-green-500"
                    />
                    <p className="text-xs text-gray-500">
                      You'll receive a payment prompt on this number
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Instructions */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Payment Instructions</h4>
                  <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                    <li>Enter your M-Pesa registered phone number above</li>
                    <li>Click "Pay with M-Pesa" to initiate payment</li>
                    <li>You'll receive an M-Pesa prompt on your phone</li>
                    <li>Enter your M-Pesa PIN to complete the payment</li>
                    <li>You'll receive confirmation SMS and email</li>
                  </ol>
                </CardContent>
              </Card>

              <Button
                onClick={handlePayment}
                disabled={!phoneNumber || isProcessing}
                className="w-full h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg transition-all duration-300 disabled:from-gray-300 disabled:to-gray-300"
              >
                {isProcessing ? 'Processing...' : `Pay KSh ${totalAmount.toLocaleString()} with M-Pesa`}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Booking Summary */}
        <div className="space-y-6">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-lg">Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Route:</span>
                  <span className="font-medium">{bookingData.from} → {bookingData.to}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span className="font-medium">
                    {bookingData.date ? format(bookingData.date, "MMM dd, yyyy") : ''}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span>Bus:</span>
                  <span className="font-medium">{bookingData.selectedBus?.company}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Departure:</span>
                  <span className="font-medium">{bookingData.selectedBus?.departure}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Class:</span>
                  <span className="font-medium capitalize">{bookingData.class}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Passengers:</span>
                  <span className="font-medium">{bookingData.passengers}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Seats:</span>
                  <span className="font-medium">{bookingData.selectedSeats.join(', ')}</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="border-t pt-4 space-y-2">
                <div className="font-medium text-gray-800 mb-2">Price Breakdown</div>
                {breakdown.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.label}</span>
                    <span>KSh {item.amount.toLocaleString()}</span>
                  </div>
                ))}
                <div className="border-t pt-2 flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>KSh {totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Passengers List */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Passengers</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {bookingData.passengerInfo.map((passenger: any, index: number) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <div>
                    <div className="font-medium">{passenger.firstName} {passenger.lastName}</div>
                    <div className="text-gray-500">Seat {bookingData.selectedSeats[index]}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* M-Pesa Payment Modal */}
      <Dialog open={showMpesaModal} onOpenChange={setShowMpesaModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">M</span>
              </div>
              <span>M-Pesa Payment</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800 mb-2">
                KSh {totalAmount.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">to {phoneNumber}</div>
            </div>

            <div className="space-y-4">
              {paymentStep >= 1 && (
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    paymentStep > 1 ? 'bg-green-500' : 'bg-blue-500'
                  }`}>
                    {paymentStep > 1 ? (
                      <Check className="h-4 w-4 text-white" />
                    ) : (
                      <Clock className="h-4 w-4 text-white animate-spin" />
                    )}
                  </div>
                  <span className="text-sm">Initiating payment request...</span>
                </div>
              )}

              {paymentStep >= 2 && (
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    paymentStep > 2 ? 'bg-green-500' : 'bg-blue-500'
                  }`}>
                    {paymentStep > 2 ? (
                      <Check className="h-4 w-4 text-white" />
                    ) : (
                      <Clock className="h-4 w-4 text-white animate-spin" />
                    )}
                  </div>
                  <span className="text-sm">Sending M-Pesa prompt to your phone...</span>
                </div>
              )}

              {paymentStep >= 3 && (
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    paymentStep > 3 ? 'bg-green-500' : 'bg-blue-500'
                  }`}>
                    {paymentStep > 3 ? (
                      <Check className="h-4 w-4 text-white" />
                    ) : (
                      <Clock className="h-4 w-4 text-white animate-spin" />
                    )}
                  </div>
                  <span className="text-sm">Waiting for payment confirmation...</span>
                </div>
              )}

              {paymentStep >= 4 && (
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-green-600">Payment successful!</span>
                </div>
              )}
            </div>

            {paymentStep >= 4 && (
              <div className="space-y-3">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="text-sm text-green-800">
                    ✅ Payment completed successfully<br/>
                    📱 Confirmation SMS sent to {phoneNumber}<br/>
                    📧 E-ticket will be sent to your email
                  </div>
                </div>
                
                <Button 
                  onClick={handlePaymentSuccess}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Continue to Confirmation
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onPrev} className="flex items-center space-x-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>
      </div>
    </div>
  );
};

export default PaymentSection;
