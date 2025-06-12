
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, User } from 'lucide-react';

interface SeatSelectionProps {
  bookingData: any;
  updateBookingData: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const generateSeatMap = (busClass: string) => {
  const seatConfig = {
    economy: { rows: 12, seatsPerRow: 4, prefix: 'E' },
    business: { rows: 8, seatsPerRow: 3, prefix: 'B' },
    vip: { rows: 6, seatsPerRow: 2, prefix: 'V' }
  };

  const config = seatConfig[busClass as keyof typeof seatConfig] || seatConfig.economy;
  const seats = [];
  const occupiedSeats = Math.floor(Math.random() * (config.rows * config.seatsPerRow * 0.4)); // 40% occupied

  for (let row = 1; row <= config.rows; row++) {
    for (let seatNum = 1; seatNum <= config.seatsPerRow; seatNum++) {
      const seatId = `${config.prefix}${row}${String.fromCharCode(64 + seatNum)}`;
      const isOccupied = Math.random() < 0.3; // 30% chance of being occupied
      seats.push({
        id: seatId,
        row,
        position: seatNum,
        isOccupied,
        isSelected: false
      });
    }
  }

  return seats;
};

const SeatSelection: React.FC<SeatSelectionProps> = ({ 
  bookingData, 
  updateBookingData, 
  onNext, 
  onPrev 
}) => {
  const [seats, setSeats] = useState(() => generateSeatMap(bookingData.class));
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const handleSeatClick = (seatId: string) => {
    if (seats.find(s => s.id === seatId)?.isOccupied) return;

    let newSelectedSeats = [...selectedSeats];
    
    if (newSelectedSeats.includes(seatId)) {
      newSelectedSeats = newSelectedSeats.filter(id => id !== seatId);
    } else if (newSelectedSeats.length < bookingData.passengers) {
      newSelectedSeats.push(seatId);
    }

    setSelectedSeats(newSelectedSeats);
    updateBookingData({ selectedSeats: newSelectedSeats });
  };

  const getSeatClass = (seat: any) => {
    if (seat.isOccupied) return 'bg-gray-300 cursor-not-allowed';
    if (selectedSeats.includes(seat.id)) return 'bg-blue-500 text-white border-blue-600';
    return 'bg-white border-gray-300 hover:border-blue-400 cursor-pointer';
  };

  const canProceed = selectedSeats.length === bookingData.passengers;

  const getSeatPrice = () => {
    const basePrice = bookingData.selectedBus?.price[bookingData.class] || 0;
    return basePrice * selectedSeats.length;
  };

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Seat Map */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg">
              <CardTitle className="text-xl text-gray-800 flex items-center justify-between">
                <span>Select Your Seats</span>
                <Badge variant="outline" className="capitalize">
                  {bookingData.class} Class
                </Badge>
              </CardTitle>
              <p className="text-gray-600 text-sm">
                Choose {bookingData.passengers} seat{bookingData.passengers > 1 ? 's' : ''} for your journey
              </p>
            </CardHeader>
            
            <CardContent className="p-6">
              {/* Legend */}
              <div className="flex justify-center space-x-6 mb-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-white border border-gray-300 rounded"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span>Selected</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-300 rounded"></div>
                  <span>Occupied</span>
                </div>
              </div>

              {/* Bus Layout */}
              <div className="bg-gray-50 rounded-lg p-6 max-w-md mx-auto">
                {/* Driver Section */}
                <div className="mb-4 text-center">
                  <div className="w-12 h-8 bg-gray-300 rounded mx-auto mb-2"></div>
                  <div className="text-xs text-gray-500">Driver</div>
                </div>

                {/* Seats */}
                <div className="space-y-2">
                  {Array.from({ length: Math.max(...seats.map(s => s.row)) }).map((_, rowIndex) => {
                    const rowNumber = rowIndex + 1;
                    const rowSeats = seats.filter(s => s.row === rowNumber);
                    const seatsPerRow = Math.max(...seats.map(s => s.position));

                    return (
                      <div key={rowNumber} className="flex justify-center items-center space-x-2">
                        <div className="w-6 text-xs text-gray-500 text-center">{rowNumber}</div>
                        <div className="flex space-x-1">
                          {rowSeats.slice(0, Math.ceil(seatsPerRow / 2)).map((seat) => (
                            <button
                              key={seat.id}
                              onClick={() => handleSeatClick(seat.id)}
                              className={`w-8 h-8 rounded border-2 text-xs font-medium transition-all duration-200 ${getSeatClass(seat)}`}
                              disabled={seat.isOccupied}
                              title={`Seat ${seat.id}`}
                            >
                              {seat.id.slice(-1)}
                            </button>
                          ))}
                        </div>
                        
                        {/* Aisle */}
                        <div className="w-4"></div>
                        
                        <div className="flex space-x-1">
                          {rowSeats.slice(Math.ceil(seatsPerRow / 2)).map((seat) => (
                            <button
                              key={seat.id}
                              onClick={() => handleSeatClick(seat.id)}
                              className={`w-8 h-8 rounded border-2 text-xs font-medium transition-all duration-200 ${getSeatClass(seat)}`}
                              disabled={seat.isOccupied}
                              title={`Seat ${seat.id}`}
                            >
                              {seat.id.slice(-1)}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Selection Summary */}
        <div className="space-y-6">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-lg">Selection Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Route:</span>
                <span className="font-medium">{bookingData.from} → {bookingData.to}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span>Bus:</span>
                <span className="font-medium">{bookingData.selectedBus?.company}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span>Class:</span>
                <span className="font-medium capitalize">{bookingData.class}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span>Passengers:</span>
                <span className="font-medium">{bookingData.passengers}</span>
              </div>

              {selectedSeats.length > 0 && (
                <>
                  <div className="border-t pt-4">
                    <div className="text-sm font-medium mb-2">Selected Seats:</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedSeats.map((seatId) => (
                        <Badge key={seatId} className="bg-blue-100 text-blue-800 border-blue-200">
                          {seatId}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span>KSh {getSeatPrice().toLocaleString()}</span>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Continue Button */}
          <Button
            onClick={onNext}
            disabled={!canProceed}
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold rounded-lg transition-all duration-300 disabled:from-gray-300 disabled:to-gray-300"
          >
            Continue to Details
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
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

export default SeatSelection;
