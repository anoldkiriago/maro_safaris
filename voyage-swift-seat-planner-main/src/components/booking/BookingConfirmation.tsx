
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Calendar, Clock, MapPin, User, Download, Share } from 'lucide-react';
import { format } from 'date-fns';

interface BookingConfirmationProps {
  bookingData: any;
  onBack: () => void;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ 
  bookingData, 
  onBack 
}) => {
  const downloadTicket = () => {
    // Simulate downloading e-ticket
    console.log('Downloading e-ticket...');
    alert('E-ticket download started! Check your downloads folder.');
  };

  const shareBooking = () => {
    // Simulate sharing booking details
    if (navigator.share) {
      navigator.share({
        title: 'TravelBus Booking Confirmation',
        text: `Booking confirmed! Reference: ${bookingData.bookingReference}`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`Booking Reference: ${bookingData.bookingReference}`);
      alert('Booking reference copied to clipboard!');
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Booking Confirmed!</h1>
        <p className="text-lg text-gray-600">Your tickets have been booked successfully</p>
      </div>

      {/* Booking Reference */}
      <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6 text-center">
          <div className="text-sm text-gray-600 mb-1">Booking Reference</div>
          <div className="text-3xl font-bold text-gray-800 mb-2">{bookingData.bookingReference}</div>
          <div className="text-sm text-gray-600">
            Please save this reference number for your records
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Trip Details */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              <span>Trip Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b">
              <div>
                <div className="font-semibold text-gray-800">{bookingData.from}</div>
                <div className="text-sm text-gray-500">Departure</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-500">→</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-800">{bookingData.to}</div>
                <div className="text-sm text-gray-500">Destination</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <div className="font-medium">
                    {bookingData.date ? format(bookingData.date, "EEEE, MMM dd") : ''}
                  </div>
                  <div className="text-gray-500">Travel Date</div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <div>
                  <div className="font-medium">{bookingData.selectedBus?.departure}</div>
                  <div className="text-gray-500">Departure Time</div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Bus Company:</span>
                <span className="font-medium">{bookingData.selectedBus?.company}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Class:</span>
                <Badge className="capitalize">{bookingData.class}</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Seats:</span>
                <span className="font-medium">{bookingData.selectedSeats.join(', ')}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Passenger Information */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5 text-blue-600" />
              <span>Passengers</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {bookingData.passengerInfo.map((passenger: any, index: number) => (
              <div key={index} className="flex justify-between items-center py-3 border-b last:border-b-0">
                <div>
                  <div className="font-medium text-gray-800">
                    {passenger.firstName} {passenger.lastName}
                  </div>
                  <div className="text-sm text-gray-500">{passenger.phone}</div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="mb-1">
                    {bookingData.selectedSeats[index]}
                  </Badge>
                  <div className="text-xs text-gray-500 capitalize">{passenger.gender}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Payment Information */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>💳</span>
              <span>Payment Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Payment Method:</span>
              <span className="font-medium">M-Pesa</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Payment Status:</span>
              <Badge className="bg-green-100 text-green-800 border-green-200">
                Completed
              </Badge>
            </div>
            <div className="flex justify-between text-sm">
              <span>Phone Number:</span>
              <span className="font-medium">{bookingData.paymentPhone}</span>
            </div>
            <div className="border-t pt-3 flex justify-between text-lg font-bold">
              <span>Total Paid:</span>
              <span>KSh {bookingData.totalAmount?.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        {/* Important Information */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-lg">Important Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Arrive at the terminal 30 minutes before departure</li>
                <li>• Bring valid government-issued ID for verification</li>
                <li>• E-ticket sent to: {bookingData.passengerInfo[0]?.email}</li>
                <li>• SMS confirmation sent to: {bookingData.passengerInfo[0]?.phone}</li>
                <li>• Contact customer service for any changes</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8 mb-8">
        <Button 
          onClick={downloadTicket}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-12"
        >
          <Download className="mr-2 h-5 w-5" />
          Download E-Ticket
        </Button>
        
        <Button 
          onClick={shareBooking}
          variant="outline"
          className="flex-1 h-12 border-2"
        >
          <Share className="mr-2 h-5 w-5" />
          Share Booking
        </Button>
        
        <Button 
          onClick={onBack}
          variant="outline"
          className="flex-1 h-12 border-2"
        >
          Book Another Trip
        </Button>
      </div>

      {/* Contact Information */}
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="p-6 text-center">
          <h3 className="font-semibold text-gray-800 mb-2">Need Help?</h3>
          <p className="text-sm text-gray-600 mb-4">
            Our customer service team is here to assist you 24/7
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm">
            <div className="flex items-center justify-center space-x-2">
              <span>📞</span>
              <span>+254 700 123 456</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span>✉️</span>
              <span>support@travelbus.co.ke</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingConfirmation;
