
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Calendar, Clock, Users, Check, X } from 'lucide-react';
import RouteSelection from './booking/RouteSelection';
import BusSelection from './booking/BusSelection';
import SeatSelection from './booking/SeatSelection';
import PassengerDetails from './booking/PassengerDetails';
import PaymentSection from './booking/PaymentSection';
import BookingConfirmation from './booking/BookingConfirmation';

interface BookingFlowProps {
  onBack: () => void;
}

export interface BookingData {
  from: string;
  to: string;
  date: Date | undefined;
  passengers: number;
  selectedBus?: any;
  selectedSeats: string[];
  passengerInfo: any[];
  totalAmount: number;
  class: string;
}

const BookingFlow: React.FC<BookingFlowProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    from: '',
    to: '',
    date: undefined,
    passengers: 1,
    selectedSeats: [],
    passengerInfo: [],
    totalAmount: 0,
    class: 'economy'
  });

  const steps = [
    { number: 1, title: 'Route', icon: MapPin },
    { number: 2, title: 'Bus', icon: Clock },
    { number: 3, title: 'Seats', icon: Users },
    { number: 4, title: 'Details', icon: Users },
    { number: 5, title: 'Payment', icon: Check },
    { number: 6, title: 'Confirmation', icon: Check }
  ];

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <RouteSelection bookingData={bookingData} updateBookingData={updateBookingData} onNext={nextStep} />;
      case 2:
        return <BusSelection bookingData={bookingData} updateBookingData={updateBookingData} onNext={nextStep} onPrev={prevStep} />;
      case 3:
        return <SeatSelection bookingData={bookingData} updateBookingData={updateBookingData} onNext={nextStep} onPrev={prevStep} />;
      case 4:
        return <PassengerDetails bookingData={bookingData} updateBookingData={updateBookingData} onNext={nextStep} onPrev={prevStep} />;
      case 5:
        return <PaymentSection bookingData={bookingData} updateBookingData={updateBookingData} onNext={nextStep} onPrev={prevStep} />;
      case 6:
        return <BookingConfirmation bookingData={bookingData} onBack={onBack} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack} className="p-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">MS</span>
                </div>
                <span className="text-xl font-bold text-gray-800">Marlal Safaris</span>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Step {currentStep} of {steps.length}
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              const isAccessible = currentStep >= step.number;

              return (
                <div key={step.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCompleted 
                        ? 'bg-green-500 text-white' 
                        : isActive 
                          ? 'bg-blue-500 text-white ring-4 ring-blue-100' 
                          : isAccessible
                            ? 'bg-gray-200 text-gray-600'
                            : 'bg-gray-100 text-gray-400'
                    }`}>
                      {isCompleted ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                    </div>
                    <span className={`text-xs mt-1 transition-colors duration-300 ${
                      isActive ? 'text-blue-600 font-medium' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-2 transition-colors duration-300 ${
                      currentStep > step.number ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-8">
        {renderStep()}
      </main>
    </div>
  );
};

export default BookingFlow;
