
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { format } from 'date-fns';

interface BusSelectionProps {
  bookingData: any;
  updateBookingData: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const vehicles = [
  {
    id: 1,
    company: 'Marlal Safaris Express',
    departure: '06:00',
    arrival: '12:00',
    duration: '6h 0m',
    price: { economy: 1500, business: 2500, vip: 4000 },
    amenities: ['Guide Service', 'AC', 'Refreshments', 'Wildlife Viewing'],
    seatsAvailable: { economy: 15, business: 8, vip: 4 },
    type: 'Express'
  },
  {
    id: 2,
    company: 'Marlal Safaris Comfort',
    departure: '08:30',
    arrival: '15:00',
    duration: '6h 30m',
    price: { economy: 1400, business: 2300, vip: 3800 },
    amenities: ['Guide Service', 'AC', 'Refreshments', 'Photography Stops'],
    seatsAvailable: { economy: 20, business: 10, vip: 6 },
    type: 'Standard'
  },
  {
    id: 3,
    company: 'Marlal Safaris Luxury',
    departure: '10:00',
    arrival: '17:30',
    duration: '7h 30m',
    price: { economy: 1600, business: 2700, vip: 4200 },
    amenities: ['Expert Guide', 'AC', 'Gourmet Meals', 'Premium Experience', 'Cultural Visits'],
    seatsAvailable: { economy: 12, business: 8, vip: 4 },
    type: 'Luxury'
  }
];

const BusSelection: React.FC<BusSelectionProps> = ({ 
  bookingData, 
  updateBookingData, 
  onNext, 
  onPrev 
}) => {
  const [selectedClass, setSelectedClass] = React.useState('economy');

  const handleVehicleSelect = (vehicle: any, classType: string) => {
    const price = vehicle.price[classType as keyof typeof vehicle.price];
    updateBookingData({ 
      selectedBus: vehicle, 
      class: classType,
      totalAmount: price * bookingData.passengers
    });
    onNext();
  };

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Available Safari Vehicles</h2>
          <Badge variant="outline" className="text-sm">
            {bookingData.from} → {bookingData.to} • {bookingData.date ? format(bookingData.date, "MMM dd") : ''}
          </Badge>
        </div>
        
        {/* Class Filter */}
        <div className="flex space-x-2 mb-6">
          {[
            { key: 'economy', label: 'Standard', color: 'blue' },
            { key: 'business', label: 'Premium', color: 'green' },
            { key: 'vip', label: 'VIP Safari', color: 'purple' }
          ].map((cls) => (
            <Button
              key={cls.key}
              variant={selectedClass === cls.key ? 'default' : 'outline'}
              onClick={() => setSelectedClass(cls.key)}
              className={`${selectedClass === cls.key ? 
                cls.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
                cls.color === 'green' ? 'bg-green-600 hover:bg-green-700' :
                'bg-purple-600 hover:bg-purple-700'
                : ''}`}
            >
              {cls.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {vehicles.map((vehicle) => (
          <Card key={vehicle.id} className="hover:shadow-lg transition-shadow duration-300 border-2 hover:border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <h3 className="text-lg font-semibold text-gray-800">{vehicle.company}</h3>
                      <Badge variant="outline" className={`${
                        vehicle.type === 'Express' ? 'border-blue-200 text-blue-600' :
                        vehicle.type === 'Luxury' ? 'border-purple-200 text-purple-600' :
                        'border-gray-200 text-gray-600'
                      }`}>
                        {vehicle.type}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <div>
                        <div className="font-semibold">{vehicle.departure}</div>
                        <div className="text-sm text-gray-500">Departure</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <div>
                        <div className="font-semibold">{vehicle.arrival}</div>
                        <div className="text-sm text-gray-500">Arrival</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <div>
                        <div className="font-semibold">{vehicle.duration}</div>
                        <div className="text-sm text-gray-500">Duration</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <div>
                        <div className="font-semibold">{vehicle.seatsAvailable[selectedClass as keyof typeof vehicle.seatsAvailable]} seats</div>
                        <div className="text-sm text-gray-500">Available</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {vehicle.amenities.map((amenity, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="ml-6 text-right">
                  <div className="mb-2">
                    <div className="text-2xl font-bold text-gray-800">
                      KSh {vehicle.price[selectedClass as keyof typeof vehicle.price].toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">per person</div>
                  </div>
                  
                  {bookingData.passengers > 1 && (
                    <div className="mb-3 text-sm text-gray-600">
                      Total: KSh {(vehicle.price[selectedClass as keyof typeof vehicle.price] * bookingData.passengers).toLocaleString()}
                    </div>
                  )}

                  <Button 
                    onClick={() => handleVehicleSelect(vehicle, selectedClass)}
                    className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-6"
                    disabled={vehicle.seatsAvailable[selectedClass as keyof typeof vehicle.seatsAvailable] < bookingData.passengers}
                  >
                    {vehicle.seatsAvailable[selectedClass as keyof typeof vehicle.seatsAvailable] < bookingData.passengers ? 
                      'Not Available' : 'Select Vehicle'
                    }
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

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

export default BusSelection;
