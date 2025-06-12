
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar as CalendarIcon, Users, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface RouteSelectionProps {
  bookingData: any;
  updateBookingData: (data: any) => void;
  onNext: () => void;
}

const destinations = [
  'Nairobi', 'Maralal', 'Suguta', 'Rumuruti', 'Kisima', 'Baragoi', 
  'Wamba', 'Archer\'s Post', 'Isiolo', 'Marsabit', 'Loyangalani', 'Samburu'
];

const RouteSelection: React.FC<RouteSelectionProps> = ({ 
  bookingData, 
  updateBookingData, 
  onNext 
}) => {
  const [date, setDate] = useState<Date | undefined>(bookingData.date);

  const handleSubmit = () => {
    if (bookingData.from && bookingData.to && date && bookingData.passengers) {
      updateBookingData({ date });
      onNext();
    }
  };

  const swapCities = () => {
    updateBookingData({
      from: bookingData.to,
      to: bookingData.from
    });
  };

  const isFormValid = bookingData.from && bookingData.to && date && bookingData.passengers && bookingData.from !== bookingData.to;

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <Card className="shadow-lg border-0">
        <CardHeader className="text-center bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg">
          <CardTitle className="text-2xl text-gray-800 flex items-center justify-center space-x-2">
            <MapPin className="h-6 w-6 text-blue-600" />
            <span>Select Your Safari Route</span>
          </CardTitle>
          <p className="text-gray-600 mt-2">Choose your departure and destination locations</p>
        </CardHeader>
        
        <CardContent className="p-8 space-y-8">
          {/* From/To Section */}
          <div className="grid md:grid-cols-2 gap-6 relative">
            <div className="space-y-2">
              <Label htmlFor="from" className="text-sm font-medium text-gray-700">From</Label>
              <Select value={bookingData.from} onValueChange={(value) => updateBookingData({ from: value })}>
                <SelectTrigger className="h-12 border-2 focus:border-blue-500">
                  <SelectValue placeholder="Select departure location" />
                </SelectTrigger>
                <SelectContent>
                  {destinations.map((destination) => (
                    <SelectItem key={destination} value={destination} disabled={destination === bookingData.to}>
                      {destination}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="to" className="text-sm font-medium text-gray-700">To</Label>
              <Select value={bookingData.to} onValueChange={(value) => updateBookingData({ to: value })}>
                <SelectTrigger className="h-12 border-2 focus:border-blue-500">
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  {destinations.map((destination) => (
                    <SelectItem key={destination} value={destination} disabled={destination === bookingData.from}>
                      {destination}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Swap Button */}
            {bookingData.from && bookingData.to && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={swapCities}
                className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white border-2 border-gray-200 hover:border-blue-500 z-10 p-2 h-auto"
              >
                <ArrowRight className="h-4 w-4 transform rotate-90 md:rotate-0" />
              </Button>
            )}
          </div>

          {/* Date and Passengers */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Departure Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "h-12 w-full justify-start text-left font-normal border-2 focus:border-blue-500",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="passengers" className="text-sm font-medium text-gray-700">Passengers</Label>
              <Select value={bookingData.passengers.toString()} onValueChange={(value) => updateBookingData({ passengers: parseInt(value) })}>
                <SelectTrigger className="h-12 border-2 focus:border-blue-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? 'Passenger' : 'Passengers'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Popular Routes */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Popular Safari Routes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { from: 'Nairobi', to: 'Maralal', duration: '6h' },
                { from: 'Maralal', to: 'Samburu', duration: '4h' },
                { from: 'Nairobi', to: 'Suguta', duration: '8h' }
              ].map((route, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="p-3 cursor-pointer hover:bg-blue-50 border-blue-200 justify-between"
                  onClick={() => updateBookingData({ from: route.from, to: route.to })}
                >
                  <span>{route.from} → {route.to}</span>
                  <span className="text-xs text-gray-500">{route.duration}</span>
                </Badge>
              ))}
            </div>
          </div>

          {/* Route Summary */}
          {bookingData.from && bookingData.to && date && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="font-semibold text-gray-800">{bookingData.from}</div>
                      <div className="text-sm text-gray-500">Departure</div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-blue-600" />
                    <div className="text-center">
                      <div className="font-semibold text-gray-800">{bookingData.to}</div>
                      <div className="text-sm text-gray-500">Destination</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-800">{format(date, "MMM dd")}</div>
                    <div className="text-sm text-gray-500">{bookingData.passengers} passenger(s)</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Continue Button */}
          <div className="pt-4">
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold rounded-lg transition-all duration-300 disabled:from-gray-300 disabled:to-gray-300"
            >
              Search Safari Vehicles
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RouteSelection;
