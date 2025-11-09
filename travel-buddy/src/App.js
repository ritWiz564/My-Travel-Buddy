import React, { useState, useEffect } from 'react';
import AuthPage from './AuthPage';
import { Plane, MapPin, Calendar, DollarSign, Sparkles } from 'lucide-react';

const TravelBuddyDemo = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [budget, setBudget] = useState('');
  const [duration, setDuration] = useState(5);
  const [destination, setDestination] = useState('goa');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [itinerary, setItinerary] = useState(null);

   useEffect(() => {
    if (window.location.hash === '#auth') {
      setShowAuth(true);
    }
  }, []);
  

  const destinations = {
    goa: {
      name: 'Goa',
      icon: '🏖️',
      places: [
        { name: 'Baga Beach', time: 'Morning', activity: 'Beach activities & water sports' },
        { name: 'Fort Aguada', time: 'Morning', activity: 'Historic fort exploration' },
        { name: 'Basilica of Bom Jesus', time: 'Afternoon', activity: 'UNESCO World Heritage site visit' },
        { name: 'Dudhsagar Waterfalls', time: 'Morning', activity: 'Trekking & nature photography' },
        { name: 'Anjuna Flea Market', time: 'Evening', activity: 'Shopping & local culture' },
        { name: 'Chapora Fort', time: 'Afternoon', activity: 'Scenic views & photography' },
        { name: 'Palolem Beach', time: 'Evening', activity: 'Sunset & relaxation' },
        { name: 'Spice Plantation', time: 'Afternoon', activity: 'Guided tour & traditional lunch' },
        { name: 'Casino Cruise', time: 'Night', activity: 'Entertainment & dining' },
        { name: 'Calangute Beach', time: 'Morning', activity: 'Parasailing & jet skiing' },
        { name: 'Fontainhas Latin Quarter', time: 'Afternoon', activity: 'Heritage walk' },
        { name: 'Butterfly Beach', time: 'Evening', activity: 'Secluded beach experience' },
        { name: 'Reis Magos Fort', time: 'Morning', activity: 'Art gallery & history' },
        { name: 'Morjim Beach', time: 'Afternoon', activity: 'Turtle watching' },
        { name: 'Arambol Beach', time: 'Evening', activity: 'Live music & cafes' }
      ]
    },
    manali: {
      name: 'Manali',
      icon: '🏔️',
      places: [
        { name: 'Rohtang Pass', time: 'Morning', activity: 'Snow activities & scenic views' },
        { name: 'Solang Valley', time: 'Morning', activity: 'Paragliding & cable car ride' },
        { name: 'Hadimba Temple', time: 'Morning', activity: 'Ancient temple in cedar forest' },
        { name: 'Old Manali', time: 'Afternoon', activity: 'Cafe hopping & shopping' },
        { name: 'Jogini Waterfalls', time: 'Morning', activity: 'Trekking through villages' },
        { name: 'Vashisht Hot Springs', time: 'Evening', activity: 'Natural hot water baths' },
        { name: 'Manu Temple', time: 'Morning', activity: 'Spiritual visit & architecture' },
        { name: 'Gulaba', time: 'Afternoon', activity: 'Snow point & photography' },
        { name: 'Mall Road', time: 'Evening', activity: 'Shopping & local food' },
        { name: 'Beas River', time: 'Morning', activity: 'River rafting adventure' },
        { name: 'Nehru Kund', time: 'Afternoon', activity: 'Natural spring visit' },
        { name: 'Van Vihar', time: 'Evening', activity: 'Nature park & boating' },
        { name: 'Tibetan Monastery', time: 'Morning', activity: 'Buddhist culture & handicrafts' },
        { name: 'Rahala Falls', time: 'Afternoon', activity: 'Waterfall photography' },
        { name: 'Naggar Castle', time: 'Morning', activity: 'Heritage hotel & art gallery' }
      ]
    },
    jaipur: {
      name: 'Jaipur',
      icon: '🕌',
      places: [
        { name: 'Hawa Mahal', time: 'Morning', activity: 'Palace of Winds photography' },
        { name: 'Amber Fort', time: 'Morning', activity: 'Elephant ride & palace tour' },
        { name: 'City Palace', time: 'Afternoon', activity: 'Royal residence & museum' },
        { name: 'Govind Dev Ji Temple', time: 'Morning', activity: 'Spiritual darshan & aarti' },
        { name: 'Nahargarh Fort', time: 'Evening', activity: 'Sunset views over city' },
        { name: 'Jhalana Leopard Safari', time: 'Morning', activity: 'Wildlife spotting in city forest' },
        { name: 'Jantar Mantar', time: 'Afternoon', activity: 'Astronomical observatory UNESCO site' },
        { name: 'Jal Mahal', time: 'Evening', activity: 'Water palace photography' },
        { name: 'Albert Hall Museum', time: 'Afternoon', activity: 'Art & artifacts collection' },
        { name: 'Jaigarh Fort', time: 'Morning', activity: 'World\'s largest cannon & views' },
        { name: 'Bapu Bazaar', time: 'Evening', activity: 'Traditional shopping & textiles' },
        { name: 'Galtaji Temple', time: 'Morning', activity: 'Monkey temple & holy kunds' },
        { name: 'Birla Mandir', time: 'Evening', activity: 'White marble temple' },
        { name: 'Chokhi Dhani', time: 'Night', activity: 'Rajasthani village experience' },
        { name: 'Sisodia Rani Garden', time: 'Afternoon', activity: 'Mughal garden & fountains' }
      ]
    },
    kerala: {
      name: 'Kerala',
      icon: '🌴',
      places: [
        { name: 'Alleppey Backwaters', time: 'Morning', activity: 'Houseboat cruise experience' },
        { name: 'Munnar Tea Gardens', time: 'Morning', activity: 'Tea plantation tour & tasting' },
        { name: 'Periyar Wildlife Sanctuary', time: 'Morning', activity: 'Elephant & tiger safari' },
        { name: 'Kovalam Beach', time: 'Evening', activity: 'Beach relaxation & lighthouse' },
        { name: 'Athirapally Waterfalls', time: 'Afternoon', activity: 'Kerala\'s Niagara photography' },
        { name: 'Fort Kochi', time: 'Afternoon', activity: 'Chinese fishing nets & colonial heritage' },
        { name: 'Varkala Beach', time: 'Evening', activity: 'Cliff beach & sunset' },
        { name: 'Wayanad Hills', time: 'Morning', activity: 'Trekking & wildlife' },
        { name: 'Kumarakom Bird Sanctuary', time: 'Morning', activity: 'Bird watching cruise' },
        { name: 'Padmanabhaswamy Temple', time: 'Morning', activity: 'Ancient temple architecture' },
        { name: 'Bekal Fort', time: 'Afternoon', activity: 'Coastal fort & beach views' },
        { name: 'Thekkady', time: 'Morning', activity: 'Spice plantation tour' },
        { name: 'Marari Beach', time: 'Evening', activity: 'Serene beach experience' },
        { name: 'Guruvayur Temple', time: 'Morning', activity: 'Krishna temple pilgrimage' },
        { name: 'Vagamon', time: 'Afternoon', activity: 'Meadows & adventure sports' }
      ]
    },
    ladakh: {
      name: 'Ladakh',
      icon: '🏔️',
      places: [
        { name: 'Pangong Lake', time: 'Morning', activity: 'Blue water lake photography' },
        { name: 'Nubra Valley', time: 'Morning', activity: 'Sand dunes & double-humped camels' },
        { name: 'Khardung La Pass', time: 'Morning', activity: 'World\'s highest motorable road' },
        { name: 'Leh Palace', time: 'Afternoon', activity: 'Royal palace & panoramic views' },
        { name: 'Thiksey Monastery', time: 'Morning', activity: 'Buddhist monastery & morning prayer' },
        { name: 'Magnetic Hill', time: 'Afternoon', activity: 'Gravity-defying phenomenon' },
        { name: 'Shanti Stupa', time: 'Evening', activity: 'Peace pagoda & sunset views' },
        { name: 'Tso Moriri Lake', time: 'Morning', activity: 'High altitude wetland reserve' },
        { name: 'Hemis Monastery', time: 'Morning', activity: 'Largest monastery in Ladakh' },
        { name: 'Diskit Monastery', time: 'Afternoon', activity: 'Giant Buddha statue' },
        { name: 'Zanskar Valley', time: 'Morning', activity: 'Remote valley exploration' },
        { name: 'Lamayuru', time: 'Afternoon', activity: 'Moonland landscapes' },
        { name: 'Tso Kar Lake', time: 'Morning', activity: 'Salt water lake & birdlife' },
        { name: 'Hall of Fame', time: 'Afternoon', activity: 'War memorial museum' },
        { name: 'Alchi Monastery', time: 'Morning', activity: 'Ancient Buddhist art' }
      ]
    },
    rishikesh: {
      name: 'Rishikesh',
      icon: '🕉️',
      places: [
        { name: 'Laxman Jhula', time: 'Morning', activity: 'Iconic suspension bridge walk' },
        { name: 'Ram Jhula', time: 'Morning', activity: 'River views & temples' },
        { name: 'Beatles Ashram', time: 'Afternoon', activity: 'Graffiti & meditation halls' },
        { name: 'Triveni Ghat', time: 'Evening', activity: 'Ganga Aarti ceremony' },
        { name: 'Neer Garh Waterfall', time: 'Afternoon', activity: 'Trekking & natural pools' },
        { name: 'Parmarth Niketan', time: 'Evening', activity: 'Evening aarti & yoga' },
        { name: 'Rajaji National Park', time: 'Morning', activity: 'Wildlife safari & elephants' },
        { name: 'Kunjapuri Temple', time: 'Morning', activity: 'Sunrise trek & Himalayan views' },
        { name: 'Shivpuri', time: 'Morning', activity: 'White water rafting adventure' },
        { name: 'Vashishta Cave', time: 'Afternoon', activity: 'Ancient meditation cave' },
        { name: 'Jumpin Heights', time: 'Afternoon', activity: 'Bungee jumping & giant swing' },
        { name: 'Swarg Ashram', time: 'Morning', activity: 'Peaceful ashram & yoga' },
        { name: 'Patna Waterfall', time: 'Afternoon', activity: 'Hidden waterfall trek' },
        { name: 'Tera Manzil Temple', time: 'Morning', activity: '13-story temple complex' },
        { name: 'Kaudiyala', time: 'Morning', activity: 'Extreme rafting starting point' }
      ]
    }
  };

  const travelStyles = [
    { id: 'adventure', icon: '🏔️', label: 'Adventure' },
    { id: 'cultural', icon: '🕌', label: 'Cultural' },
    { id: 'relaxation', icon: '🏖️', label: 'Relaxation' },
    { id: 'romantic', icon: '💑', label: 'Romantic' }
  ];

  const generateItinerary = () => {
    if (!budget || !selectedStyle) {
      alert('Please fill in all fields and select a travel style!');
      return;
    }

    setIsGenerating(true);
    setCurrentStep(2);

    setTimeout(() => {
      const destData = destinations[destination];
      const dailyBudget = Math.floor(budget / duration);
      
      const allPlaces = [...destData.places];
      const shuffledPlaces = allPlaces.sort(() => Math.random() - 0.5);
      
      const days = [];
      let placeIndex = 0;

      for (let day = 1; day <= duration; day++) {
        const dayCost = dailyBudget + (Math.random() * 1000 - 500);
        const dayActivities = [];
        const numActivities = 3 + Math.floor(Math.random() * 2);
        
        for (let i = 0; i < numActivities; i++) {
          if (placeIndex >= shuffledPlaces.length) {
            placeIndex = 0;
          }
          
          const place = shuffledPlaces[placeIndex];
          placeIndex++;
          
          dayActivities.push({
            name: place.name,
            time: place.time,
            activity: place.activity
          });
        }
        
        days.push({ day, cost: Math.floor(dayCost), activities: dayActivities });
      }

      const flightCost = Math.floor(budget * 0.3);
      const hotelCost = Math.floor(budget * 0.35);
      const activitiesCost = Math.floor(budget * 0.25);
      const foodCost = Math.floor(budget * 0.10);

      setItinerary({
        destination: destData,
        days,
        breakdown: { flightCost, hotelCost, activitiesCost, foodCost }
      });

      setIsGenerating(false);
      setShowResults(true);
      setCurrentStep(3);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-lg fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🌍 My Travel Buddy
          </div>
            <button 
              onClick={() => setShowAuth(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all">
              Sign In / Register
            </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Try Planning Your Dream Trip ✨
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Enter a few details and watch your personalized itinerary come alive
          </p>

          {/* Progress Bar */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-between relative">
              <div className={`absolute top-5 left-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500`} 
                   style={{width: `${((currentStep - 1) / 2) * 100}%`}}></div>
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex flex-col items-center relative z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    currentStep >= step ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white scale-110' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step}
                  </div>
                  <div className="text-sm mt-2 font-medium">
                    {step === 1 ? 'Input Details' : step === 2 ? 'Generate' : 'View Results'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-[1.02] transition-all">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              🎯 Plan Your Journey
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Budget (₹)
                </label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="e.g., 50000"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all"
                  min="5000"
                  step="1000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Trip Duration: <span className="text-purple-600">{duration} days</span>
                </label>
                <input
                  type="range"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  min="3"
                  max="15"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Destination
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all"
                >
                  <option value="goa">Goa 🏖️</option>
                  <option value="manali">Manali 🏔️</option>
                  <option value="jaipur">Jaipur 🕌</option>
                  <option value="kerala">Kerala 🌴</option>
                  <option value="ladakh">Ladakh 🏔️</option>
                  <option value="rishikesh">Rishikesh 🕉️</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Travel Style
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {travelStyles.map((style) => (
                    <div
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all transform hover:scale-105 ${
                        selectedStyle === style.id
                          ? 'border-purple-500 bg-purple-50 shadow-lg'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="text-3xl mb-2">{style.icon}</div>
                      <div className="font-semibold">{style.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={generateItinerary}
                disabled={isGenerating}
                className={`w-full py-4 rounded-xl font-bold text-white text-lg flex items-center justify-center gap-2 transition-all transform hover:scale-105 ${
                  isGenerating
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-2xl'
                }`}
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Itinerary
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Output Panel */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 overflow-auto max-h-[800px]">
            {!showResults ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-20">
                <div className="text-7xl mb-4 animate-bounce">🗺️</div>
                <h3 className="text-2xl font-bold mb-2">Your Itinerary Awaits!</h3>
                <p className="text-gray-600">
                  Fill in your preferences and generate your personalized trip plan
                </p>
              </div>
            ) : (
              <div className="space-y-6 animate-fadeIn">
                {/* Header */}
                <div className="text-center pb-6 border-b-2 border-gray-100">
                  <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
                    {itinerary.destination.icon} Your {itinerary.destination.name} Adventure
                  </h2>
                  <div className="flex justify-center gap-6 flex-wrap">
                    <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <strong>{duration} Days</strong>
                    </div>
                    <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <strong>₹{parseInt(budget).toLocaleString()}</strong>
                    </div>
                    <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full">
                      <MapPin className="w-4 h-4 text-purple-600" />
                      <strong className="capitalize">{selectedStyle}</strong>
                    </div>
                  </div>
                </div>

                {/* Daily Itinerary */}
                {itinerary.days.map((dayData) => (
                  <div key={dayData.day} className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold">Day {dayData.day}</h3>
                      <div className="bg-white px-4 py-2 rounded-full font-semibold text-green-600">
                        ₹{dayData.cost.toLocaleString()}
                      </div>
                    </div>
                    <div className="space-y-3">
                      {dayData.activities.map((act, idx) => (
                        <div key={idx} className="flex gap-3 bg-white p-4 rounded-xl hover:shadow-md transition-all">
                          <div className="text-2xl">📍</div>
                          <div className="flex-1">
                            <h4 className="font-bold text-lg text-purple-600">
                              {act.name}
                            </h4>
                            <p className="text-sm text-gray-500 font-medium">{act.time}</p>
                            <p className="text-sm text-gray-600 mt-1">{act.activity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Cost Breakdown */}
                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-4">💰 Budget Breakdown</h3>
                  <div className="space-y-3">
                    {[
                      { label: '✈️ Flights', value: itinerary.breakdown.flightCost },
                      { label: '🏨 Accommodation', value: itinerary.breakdown.hotelCost },
                      { label: '🎯 Activities', value: itinerary.breakdown.activitiesCost },
                      { label: '🍽️ Food & Dining', value: itinerary.breakdown.foodCost }
                    ].map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-white p-3 rounded-xl">
                        <span className="font-medium">{item.label}</span>
                        <span className="font-bold text-green-600">₹{item.value.toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl font-bold">
                      <span>Total</span>
                      <span>₹{parseInt(budget).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 text-center">
        <p>© 2025 My Travel Buddy. Travel made simple with Us.</p>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
      {showAuth && (
  <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-30">
    <AuthPage onBackToDemo={() => window.location.href = '../../index.html'} />
  </div>
)}
    </div>
  );
};
export default TravelBuddyDemo;
