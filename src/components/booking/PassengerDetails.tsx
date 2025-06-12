
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, ArrowRight, User } from 'lucide-react';

interface PassengerDetailsProps {
  bookingData: any;
  updateBookingData: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

interface PassengerInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  idNumber: string;
  gender: string;
}

const PassengerDetails: React.FC<PassengerDetailsProps> = ({ 
  bookingData, 
  updateBookingData, 
  onNext, 
  onPrev 
}) => {
  const [passengers, setPassengers] = useState<PassengerInfo[]>(
    bookingData.passengerInfo.length > 0 
      ? bookingData.passengerInfo 
      : Array(bookingData.passengers).fill(null).map(() => ({
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          idNumber: '',
          gender: ''
        }))
  );

  const updatePassenger = (index: number, field: keyof PassengerInfo, value: string) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = { ...updatedPassengers[index], [field]: value };
    setPassengers(updatedPassengers);
  };

  const isFormValid = () => {
    return passengers.every(passenger => 
      passenger.firstName && 
      passenger.lastName && 
      passenger.phone && 
      passenger.email && 
      passenger.idNumber &&
      passenger.gender
    );
  };

  const handleContinue = () => {
    if (isFormValid()) {
      updateBookingData({ passengerInfo: passengers });
      onNext();
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg">
          <CardTitle className="text-2xl text-gray-800 flex items-center space-x-2">
            <User className="h-6 w-6 text-blue-600" />
            <span>Passenger Details</span>
          </CardTitle>
          <p className="text-gray-600 mt-2">Please provide information for all passengers</p>
        </CardHeader>
        
        <CardContent className="p-8 space-y-8">
          {passengers.map((passenger, index) => (
            <div key={index} className="space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Passenger {index + 1}
                  {bookingData.selectedSeats[index] && (
                    <span className="ml-2 text-sm text-gray-500">
                      (Seat {bookingData.selectedSeats[index]})
                    </span>
                  )}
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor={`firstName-${index}`} className="text-sm font-medium text-gray-700">
                    First Name *
                  </Label>
                  <Input
                    id={`firstName-${index}`}
                    placeholder="Enter first name"
                    value={passenger.firstName}
                    onChange={(e) => updatePassenger(index, 'firstName', e.target.value)}
                    className="h-11 border-2 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`lastName-${index}`} className="text-sm font-medium text-gray-700">
                    Last Name *
                  </Label>
                  <Input
                    id={`lastName-${index}`}
                    placeholder="Enter last name"
                    value={passenger.lastName}
                    onChange={(e) => updatePassenger(index, 'lastName', e.target.value)}
                    className="h-11 border-2 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`phone-${index}`} className="text-sm font-medium text-gray-700">
                    Phone Number *
                  </Label>
                  <Input
                    id={`phone-${index}`}
                    placeholder="0700 123 456"
                    value={passenger.phone}
                    onChange={(e) => updatePassenger(index, 'phone', e.target.value)}
                    className="h-11 border-2 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`email-${index}`} className="text-sm font-medium text-gray-700">
                    Email Address *
                  </Label>
                  <Input
                    id={`email-${index}`}
                    type="email"
                    placeholder="john@example.com"
                    value={passenger.email}
                    onChange={(e) => updatePassenger(index, 'email', e.target.value)}
                    className="h-11 border-2 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`idNumber-${index}`} className="text-sm font-medium text-gray-700">
                    ID Number *
                  </Label>
                  <Input
                    id={`idNumber-${index}`}
                    placeholder="12345678"
                    value={passenger.idNumber}
                    onChange={(e) => updatePassenger(index, 'idNumber', e.target.value)}
                    className="h-11 border-2 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Gender *</Label>
                  <Select 
                    value={passenger.gender} 
                    onValueChange={(value) => updatePassenger(index, 'gender', value)}
                  >
                    <SelectTrigger className="h-11 border-2 focus:border-blue-500">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {index < passengers.length - 1 && (
                <div className="border-b border-gray-200 mt-8"></div>
              )}
            </div>
          ))}

          {/* Important Information */}
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">Important Information</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Please ensure all details match your identification document</li>
                <li>• You'll need to present valid ID at the boarding terminal</li>
                <li>• Phone number will be used for booking confirmations and updates</li>
                <li>• Email address will receive your e-ticket and receipt</li>
              </ul>
            </CardContent>
          </Card>

          {/* Summary Card */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-semibold text-gray-800 mb-2">Journey Details</div>
                  <div className="space-y-1 text-gray-600">
                    <div>{bookingData.from} → {bookingData.to}</div>
                    <div>{bookingData.selectedBus?.company}</div>
                    <div>Departure: {bookingData.selectedBus?.departure}</div>
                    <div className="capitalize">{bookingData.class} Class</div>
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-gray-800 mb-2">Booking Summary</div>
                  <div className="space-y-1 text-gray-600">
                    <div>Passengers: {bookingData.passengers}</div>
                    <div>Seats: {bookingData.selectedSeats.join(', ')}</div>
                    <div className="text-lg font-bold text-gray-800 mt-2">
                      Total: KSh {bookingData.totalAmount?.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Continue Button */}
          <div className="pt-4">
            <Button
              onClick={handleContinue}
              disabled={!isFormValid()}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold rounded-lg transition-all duration-300 disabled:from-gray-300 disabled:to-gray-300"
            >
              Continue to Payment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>

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

export default PassengerDetails;
