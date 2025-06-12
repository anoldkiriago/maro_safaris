
import React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BookingFlow from '@/components/BookingFlow';
import { MapPin, Clock, Calendar, User, ArrowRight, Check } from 'lucide-react';

const Index = () => {
  const [showBooking, setShowBooking] = useState(false);

  if (showBooking) {
    return <BookingFlow onBack={() => setShowBooking(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">MS</span>
              </div>
              <span className="text-2xl font-bold text-gray-800">Maralal Safaris</span>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">Northern Kenya</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Book your safari adventure online with ease. Experience premium comfort, reliable service, 
            and unbeatable prices across the stunning landscapes of Northern Kenya.
          </p>
          <Button 
            onClick={() => setShowBooking(true)}
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Book Your Safari
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">200+</div>
              <div className="text-gray-600">Daily Routes</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-600">5M+</div>
              <div className="text-gray-600">Happy Travelers</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">20+</div>
              <div className="text-gray-600">Destinations</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-600">24/7</div>
              <div className="text-gray-600">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Maralal Safaris?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the difference with our premium services and adventure-first approach
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Real-Time Tracking</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">Track your safari vehicle in real-time and get live updates on arrival times</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Extensive Network</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">Connect to remote destinations across Northern Kenya with our comprehensive route network</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Safari Comfort</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">Enjoy comfortable seating, refreshments, and guided experiences on all our safari vehicles</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Vehicle Classes */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Choose Your Safari Class</h2>
            <p className="text-xl text-gray-600">Select the perfect option for your adventure</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="relative overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <Badge className="absolute top-4 right-4 bg-blue-100 text-blue-600 border-blue-200">Most Popular</Badge>
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl text-blue-600">Standard</CardTitle>
                <div className="text-3xl font-bold text-gray-800">KSh 1,500</div>
                <p className="text-gray-500">Basic comfort</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Comfortable seating</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Air conditioning</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Refreshments</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Basic guide service</span>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-green-200">
              <Badge className="absolute top-4 right-4 bg-green-100 text-green-600 border-green-200">Recommended</Badge>
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl text-green-600">Premium</CardTitle>
                <div className="text-3xl font-bold text-gray-800">KSh 2,500</div>
                <p className="text-gray-500">Enhanced experience</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Extra legroom</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Premium seating</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Complimentary meals</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Professional guide</span>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <Badge className="absolute top-4 right-4 bg-purple-100 text-purple-600 border-purple-200">Luxury</Badge>
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl text-purple-600">VIP Safari</CardTitle>
                <div className="text-3xl font-bold text-gray-800">KSh 4,000</div>
                <p className="text-gray-500">Ultimate luxury</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Luxury vehicle</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Private guide</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Gourmet meals</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Exclusive experiences</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">About Maralal Safaris</h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Founded in 2010, Marlal Safaris has been the leading provider of adventure travel and safari experiences 
            in Northern Kenya. We're committed to providing safe, comfortable, and unforgettable journeys that connect 
            travelers with the stunning landscapes and rich culture of this remarkable region.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            With our fleet of well-maintained safari vehicles and a dedicated team of experienced guides, 
            we've served over 5 million travelers and continue to expand our network to serve you better.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-600">We're here to help you 24/7</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    📞
                  </div>
                  Phone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">+254 700 789 123</p>
                <p className="text-gray-600">Available 24/7</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    ✉️
                  </div>
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">info@maralalsafaris.co.ke</p>
                <p className="text-gray-600">Response within 1 hour</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    📍
                  </div>
                  Office
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Maralal Town</p>
                <p className="text-gray-600">Samburu County, Kenya</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">MS</span>
                </div>
                <span className="text-xl font-bold">Marlal Safaris</span>
              </div>
              <p className="text-gray-400">Exploring Northern Kenya, one adventure at a time.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Book Safari</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Manage Booking</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Track Vehicle</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Help Center</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Contact Us</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Terms & Conditions</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Facebook</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Twitter</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Instagram</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 Marlal Safaris. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
