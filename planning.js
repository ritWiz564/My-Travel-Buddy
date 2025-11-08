import React, { useState } from 'react';
import { MapPin, Calendar, Users, DollarSign, Download, Share2, X, Plane, Hotel, Eye, EyeOff, Cloud, Sun, CloudRain, Wind, Droplets, Thermometer } from 'lucide-react';

const TravelPlanningApp = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    budget: '',
    travelers: '',
    style: '',
    accommodation: '',
    hiddenGems: false
  });
  const [generatedItinerary, setGeneratedItinerary] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const destinations = {
    goa: { name: 'Goa', icon: '🏖️', emoji: '🏖️' },
    manali: { name: 'Manali', icon: '🏔️', emoji: '🏔️' },
    jaipur: { name: 'Jaipur', icon: '🕌', emoji: '🕌' },
    kerala: { name: 'Kerala', icon: '🌴', emoji: '🌴' },
    ladakh: { name: 'Ladakh', icon: '⛰️', emoji: '⛰️' },
    rishikesh: { name: 'Rishikesh', icon: '🕉️', emoji: '🕉️' }
  };

  const weatherData = {
    goa: {
      seasons: {
        winter: { months: [11, 12, 1, 2], temp: '20-30°C', condition: 'Pleasant & Sunny', icon: '☀️' },
        summer: { months: [3, 4, 5], temp: '28-35°C', condition: 'Hot & Humid', icon: '🌡️' },
        monsoon: { months: [6, 7, 8, 9, 10], temp: '25-30°C', condition: 'Rainy', icon: '🌧️' }
      },
      clothing: {
        winter: ['Light cotton clothes', 'Sunglasses', 'Beachwear', 'Light jacket for evenings'],
        summer: ['Breathable cotton wear', 'Sunscreen', 'Hat/cap', 'Swimwear'],
        monsoon: ['Waterproof jacket', 'Quick-dry clothes', 'Umbrella', 'Waterproof bags']
      },
      medicalKit: ['Sunscreen SPF 50+', 'Anti-diarrheal medication', 'Antihistamines', 'Motion sickness pills', 'Mosquito repellent', 'First-aid kit', 'Electrolyte sachets']
    },
    manali: {
      seasons: {
        winter: { months: [12, 1, 2], temp: '-2 to 10°C', condition: 'Cold & Snowy', icon: '❄️' },
        spring: { months: [3, 4, 5], temp: '10-20°C', condition: 'Pleasant', icon: '🌸' },
        summer: { months: [6, 7, 8], temp: '15-25°C', condition: 'Cool & Pleasant', icon: '☀️' },
        autumn: { months: [9, 10, 11], temp: '5-15°C', condition: 'Cool', icon: '🍂' }
      },
      clothing: {
        winter: ['Heavy woolens', 'Down jacket', 'Thermal wear', 'Gloves & muffler', 'Snow boots'],
        spring: ['Light woolens', 'Jacket', 'Layered clothing', 'Comfortable shoes'],
        summer: ['Light woolens for evening', 'T-shirts', 'Light jacket', 'Trekking shoes'],
        autumn: ['Warm clothes', 'Jacket', 'Layered clothing', 'Closed shoes']
      },
      medicalKit: ['Altitude sickness medication', 'Pain relievers', 'Anti-nausea pills', 'Lip balm', 'Moisturizer', 'Cold & cough medicine', 'Band-aids', 'Hand sanitizer']
    },
    jaipur: {
      seasons: {
        winter: { months: [11, 12, 1, 2], temp: '10-25°C', condition: 'Pleasant', icon: '☀️' },
        summer: { months: [3, 4, 5, 6], temp: '30-45°C', condition: 'Very Hot', icon: '🌡️' },
        monsoon: { months: [7, 8, 9], temp: '25-35°C', condition: 'Humid & Rainy', icon: '🌧️' },
        autumn: { months: [10], temp: '20-30°C', condition: 'Pleasant', icon: '🍂' }
      },
      clothing: {
        winter: ['Light woolens', 'Cotton clothes', 'Shawl', 'Comfortable walking shoes'],
        summer: ['Light cotton clothes', 'Sunglasses', 'Wide-brimmed hat', 'Sunscreen'],
        monsoon: ['Light rain jacket', 'Cotton clothes', 'Umbrella', 'Covered footwear'],
        autumn: ['Light cotton clothes', 'Light jacket', 'Comfortable shoes']
      },
      medicalKit: ['Oral rehydration salts', 'Sunscreen SPF 50+', 'Heat rash powder', 'Stomach medication', 'Antihistamines', 'Pain relievers', 'First-aid supplies']
    },
    kerala: {
      seasons: {
        winter: { months: [12, 1, 2], temp: '23-32°C', condition: 'Pleasant', icon: '☀️' },
        summer: { months: [3, 4, 5], temp: '28-36°C', condition: 'Hot & Humid', icon: '🌡️' },
        monsoon: { months: [6, 7, 8, 9, 10, 11], temp: '24-30°C', condition: 'Heavy Rain', icon: '🌧️' }
      },
      clothing: {
        winter: ['Light cotton clothes', 'Swimwear', 'Comfortable sandals', 'Sun protection'],
        summer: ['Breathable fabrics', 'Light colors', 'Hat', 'Sunglasses', 'Swimwear'],
        monsoon: ['Waterproof jacket', 'Quick-dry clothes', 'Waterproof footwear', 'Umbrella']
      },
      medicalKit: ['Anti-malarial medication', 'Mosquito repellent', 'Anti-diarrheal pills', 'Antihistamines', 'Antiseptic cream', 'Waterproof bandages', 'Hand sanitizer']
    },
    ladakh: {
      seasons: {
        summer: { months: [5, 6, 7, 8, 9], temp: '15-25°C day, 5-10°C night', condition: 'Pleasant days, cold nights', icon: '☀️' },
        winter: { months: [10, 11, 12, 1, 2, 3, 4], temp: '-20 to 5°C', condition: 'Extremely Cold', icon: '❄️' }
      },
      clothing: {
        summer: ['Layered clothing', 'Warm jacket', 'Sun protection', 'Thermal inner wear', 'Trekking shoes', 'Sunglasses'],
        winter: ['Heavy winter gear', 'Multiple layers', 'Down jacket', 'Snow boots', 'Gloves & muffler', 'Face mask']
      },
      medicalKit: ['Altitude sickness medication (Diamox)', 'Oxygen cylinder (if needed)', 'Lip balm SPF', 'Moisturizer', 'Pain relievers', 'Nausea medication', 'Sunscreen SPF 50+', 'First-aid kit', 'Glucose/energy bars']
    },
    rishikesh: {
      seasons: {
        winter: { months: [11, 12, 1, 2], temp: '10-20°C', condition: 'Cool', icon: '☀️' },
        summer: { months: [3, 4, 5, 6], temp: '25-40°C', condition: 'Hot', icon: '🌡️' },
        monsoon: { months: [7, 8, 9], temp: '25-30°C', condition: 'Rainy', icon: '🌧️' },
        autumn: { months: [10], temp: '15-25°C', condition: 'Pleasant', icon: '🍂' }
      },
      clothing: {
        winter: ['Light woolens', 'Jacket', 'Comfortable clothes for yoga', 'Closed shoes'],
        summer: ['Light cotton clothes', 'Sunglasses', 'Hat', 'Swimwear for rafting'],
        monsoon: ['Waterproof gear', 'Quick-dry clothes', 'Covered shoes', 'Rain jacket'],
        autumn: ['Light layers', 'Comfortable wear', 'Light jacket', 'Walking shoes']
      },
      medicalKit: ['Motion sickness pills', 'Anti-diarrheal medication', 'Pain relievers', 'Antiseptic cream', 'Band-aids', 'Mosquito repellent', 'Water purification tablets']
    }
  };

  const destinationPlaces = {
    goa: {
      regular: [
        { name: 'Baga Beach', time: 'Morning', activity: 'Beach activities & water sports' },
        { name: 'Fort Aguada', time: 'Afternoon', activity: 'Historic fort exploration' },
        { name: 'Basilica of Bom Jesus', time: 'Evening', activity: 'UNESCO World Heritage site' },
        { name: 'Calangute Beach', time: 'Morning', activity: 'Parasailing & jet skiing' },
        { name: 'Dudhsagar Waterfalls', time: 'Morning', activity: 'Trekking & nature photography' },
        { name: 'Anjuna Flea Market', time: 'Evening', activity: 'Shopping & local culture' }
      ],
      hidden: [
        { name: 'Butterfly Beach', time: 'Morning', activity: 'Secluded beach & dolphin spotting', isHidden: true },
        { name: 'Divar Island', time: 'Afternoon', activity: 'Rural Goa cycling tour', isHidden: true },
        { name: 'Netravali Bubbling Lake', time: 'Afternoon', activity: 'Natural phenomenon exploration', isHidden: true }
      ]
    },
    manali: {
      regular: [
        { name: 'Rohtang Pass', time: 'Morning', activity: 'Snow activities & scenic views' },
        { name: 'Solang Valley', time: 'Afternoon', activity: 'Paragliding & cable car' },
        { name: 'Hadimba Temple', time: 'Evening', activity: 'Ancient cedar forest temple' },
        { name: 'Old Manali', time: 'Afternoon', activity: 'Cafe hopping & shopping' },
        { name: 'Vashisht Hot Springs', time: 'Evening', activity: 'Natural hot water baths' }
      ],
      hidden: [
        { name: 'Jogini Waterfalls', time: 'Morning', activity: 'Hidden trek through villages', isHidden: true },
        { name: 'Jana Waterfall', time: 'Afternoon', activity: 'Off-beat nature escape', isHidden: true },
        { name: 'Gulaba', time: 'Morning', activity: 'Untouched snow landscapes', isHidden: true }
      ]
    },
    jaipur: {
      regular: [
        { name: 'Hawa Mahal', time: 'Morning', activity: 'Palace of Winds photography' },
        { name: 'Amber Fort', time: 'Afternoon', activity: 'Elephant ride & palace tour' },
        { name: 'City Palace', time: 'Evening', activity: 'Royal residence & museum' },
        { name: 'Jantar Mantar', time: 'Afternoon', activity: 'Astronomical observatory' },
        { name: 'Nahargarh Fort', time: 'Evening', activity: 'Sunset views over city' }
      ],
      hidden: [
        { name: 'Panna Meena Kund', time: 'Morning', activity: 'Ancient stepwell photography', isHidden: true },
        { name: 'Galtaji Temple', time: 'Afternoon', activity: 'Monkey temple in hills', isHidden: true },
        { name: 'Sambhar Salt Lake', time: 'Morning', activity: 'Pink flamingos & salt flats', isHidden: true }
      ]
    },
    kerala: {
      regular: [
        { name: 'Alleppey Backwaters', time: 'Morning', activity: 'Houseboat cruise experience' },
        { name: 'Munnar Tea Gardens', time: 'Afternoon', activity: 'Tea plantation tour' },
        { name: 'Kovalam Beach', time: 'Evening', activity: 'Beach relaxation & lighthouse' },
        { name: 'Fort Kochi', time: 'Afternoon', activity: 'Chinese fishing nets & heritage' },
        { name: 'Periyar Wildlife', time: 'Morning', activity: 'Elephant & tiger safari' }
      ],
      hidden: [
        { name: 'Vagamon Meadows', time: 'Morning', activity: 'Misty hills & pine forests', isHidden: true },
        { name: 'Gavi Eco-Tourism', time: 'Afternoon', activity: 'Pristine forest adventures', isHidden: true },
        { name: 'Marari Beach', time: 'Evening', activity: 'Secluded fishing village beach', isHidden: true }
      ]
    },
    ladakh: {
      regular: [
        { name: 'Pangong Lake', time: 'Morning', activity: 'Blue water lake photography' },
        { name: 'Nubra Valley', time: 'Afternoon', activity: 'Sand dunes & camels' },
        { name: 'Khardung La Pass', time: 'Evening', activity: 'Highest motorable road' },
        { name: 'Thiksey Monastery', time: 'Morning', activity: 'Buddhist monastery & prayer' },
        { name: 'Shanti Stupa', time: 'Evening', activity: 'Peace pagoda & sunset' }
      ],
      hidden: [
        { name: 'Tso Moriri Lake', time: 'Morning', activity: 'Remote high-altitude lake', isHidden: true },
        { name: 'Hanle Observatory', time: 'Night', activity: 'Stargazing in dark sky reserve', isHidden: true },
        { name: 'Dha-Hanu Valley', time: 'Afternoon', activity: 'Dard-Aryan villages & culture', isHidden: true }
      ]
    },
    rishikesh: {
      regular: [
        { name: 'Laxman Jhula', time: 'Morning', activity: 'Suspension bridge walk' },
        { name: 'Beatles Ashram', time: 'Afternoon', activity: 'Graffiti & meditation' },
        { name: 'Triveni Ghat', time: 'Evening', activity: 'Ganga Aarti ceremony' },
        { name: 'Neer Garh Waterfall', time: 'Afternoon', activity: 'Trekking & natural pools' },
        { name: 'Shivpuri', time: 'Morning', activity: 'White water rafting' }
      ],
      hidden: [
        { name: 'Kunjapuri Sunrise Trek', time: 'Early Morning', activity: 'Himalayan sunrise views', isHidden: true },
        { name: 'Patna Waterfall', time: 'Afternoon', activity: 'Hidden cascade in forest', isHidden: true },
        { name: 'Phool Chatti Ashram', time: 'Morning', activity: 'Peaceful riverside meditation', isHidden: true }
      ]
    }
  };

  const getSeasonFromMonth = (month, destination) => {
    const seasons = weatherData[destination].seasons;
    for (const [season, data] of Object.entries(seasons)) {
      if (data.months.includes(month)) {
        return { season, ...data };
      }
    }
    return null;
  };

  const validateStep = (step) => {
    if (step === 1) {
      if (!formData.destination || !formData.startDate || !formData.endDate) {
        alert('Please fill in all fields');
        return false;
      }
      if (new Date(formData.endDate) < new Date(formData.startDate)) {
        alert('End date cannot be before start date');
        return false;
      }
    } else if (step === 2) {
      if (!formData.budget || !formData.travelers || !formData.style || !formData.accommodation) {
        alert('Please fill in all fields');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const calculateDays = () => {
    if (!formData.startDate || !formData.endDate) return 0;
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleSubmit = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const days = calculateDays();
      const destData = destinations[formData.destination];
      const regularPlaces = destinationPlaces[formData.destination].regular;
      const hiddenPlaces = formData.hiddenGems ? destinationPlaces[formData.destination].hidden : [];
      const allPlaces = [...regularPlaces, ...hiddenPlaces];
      
      // Get weather info
      const startMonth = new Date(formData.startDate).getMonth() + 1;
      const seasonInfo = getSeasonFromMonth(startMonth, formData.destination);
      const destWeather = weatherData[formData.destination];
      
      const itinerary = {
        destination: destData.name,
        destinationIcon: destData.emoji,
        startDate: formData.startDate,
        endDate: formData.endDate,
        days: days,
        budget: formData.budget,
        travelers: formData.travelers,
        style: formData.style.charAt(0).toUpperCase() + formData.style.slice(1),
        accommodation: formData.accommodation.charAt(0).toUpperCase() + formData.accommodation.slice(1),
        hiddenGems: formData.hiddenGems,
        weather: {
          season: seasonInfo.season,
          temp: seasonInfo.temp,
          condition: seasonInfo.condition,
          icon: seasonInfo.icon,
          clothing: destWeather.clothing[seasonInfo.season] || [],
          medicalKit: destWeather.medicalKit
        },
        dailyPlans: [],
        budgetBreakdown: {
          transportation: Math.floor(formData.budget * 0.3),
          accommodation: Math.floor(formData.budget * 0.35),
          activities: Math.floor(formData.budget * 0.25),
          food: Math.floor(formData.budget * 0.10)
        }
      };

      let placeIndex = 0;
      for (let day = 1; day <= days; day++) {
        const numActivities = Math.min(3, allPlaces.length);
        const dayPlaces = [];
        
        for (let i = 0; i < numActivities; i++) {
          if (placeIndex >= allPlaces.length) placeIndex = 0;
          dayPlaces.push(allPlaces[placeIndex++]);
        }
        
        itinerary.dailyPlans.push({
          day: day,
          places: dayPlaces,
          cost: Math.floor(formData.budget / days)
        });
      }

      setGeneratedItinerary(itinerary);
      setIsGenerating(false);
      setCurrentStep(4);
    }, 2000);
  };

  const downloadPDF = () => {
    if (!generatedItinerary) return;

    let pdfContent = `MY TRAVEL BUDDY - COMPLETE ITINERARY\n${'='.repeat(70)}\n\n`;
    pdfContent += `${generatedItinerary.destinationIcon} DESTINATION: ${generatedItinerary.destination}\n`;
    pdfContent += `Dates: ${generatedItinerary.startDate} to ${generatedItinerary.endDate}\n`;
    pdfContent += `Duration: ${generatedItinerary.days} days\n`;
    pdfContent += `Budget: ₹${parseInt(generatedItinerary.budget).toLocaleString()}\n`;
    pdfContent += `Travelers: ${generatedItinerary.travelers}\n`;
    pdfContent += `Travel Style: ${generatedItinerary.style}\n`;
    pdfContent += `Accommodation: ${generatedItinerary.accommodation}\n`;
    pdfContent += `Hidden Gems: ${generatedItinerary.hiddenGems ? 'Yes' : 'No'}\n\n`;
    pdfContent += `${'='.repeat(70)}\n\n`;
    
    pdfContent += `WEATHER & CLIMATE INFORMATION\n${'-'.repeat(70)}\n`;
    pdfContent += `${generatedItinerary.weather.icon} Season: ${generatedItinerary.weather.season.toUpperCase()}\n`;
    pdfContent += `Temperature: ${generatedItinerary.weather.temp}\n`;
    pdfContent += `Condition: ${generatedItinerary.weather.condition}\n\n`;
    
    pdfContent += `CLOTHING TO PACK:\n`;
    generatedItinerary.weather.clothing.forEach(item => {
      pdfContent += `  ✓ ${item}\n`;
    });
    
    pdfContent += `\nMEDICAL KIT ESSENTIALS:\n`;
    generatedItinerary.weather.medicalKit.forEach(item => {
      pdfContent += `  + ${item}\n`;
    });
    pdfContent += `\n${'='.repeat(70)}\n\n`;
    
    pdfContent += `DAY-BY-DAY ITINERARY\n${'-'.repeat(70)}\n\n`;
    
    generatedItinerary.dailyPlans.forEach(dayPlan => {
      pdfContent += `DAY ${dayPlan.day} - Budget: ₹${dayPlan.cost.toLocaleString()}\n`;
      pdfContent += `${'-'.repeat(50)}\n`;
      dayPlan.places.forEach(place => {
        const gemLabel = place.isHidden ? ' 💎 HIDDEN GEM' : '';
        pdfContent += `\n📍 ${place.name}${gemLabel}\n`;
        pdfContent += `   Time: ${place.time}\n`;
        pdfContent += `   Activity: ${place.activity}\n`;
      });
      pdfContent += `\n${'='.repeat(70)}\n\n`;
    });

    pdfContent += `BUDGET BREAKDOWN\n${'-'.repeat(70)}\n`;
    pdfContent += `✈️  Transportation: ₹${generatedItinerary.budgetBreakdown.transportation.toLocaleString()}\n`;
    pdfContent += `🏨 Accommodation (${generatedItinerary.accommodation}): ₹${generatedItinerary.budgetBreakdown.accommodation.toLocaleString()}\n`;
    pdfContent += `🎯 Activities: ₹${generatedItinerary.budgetBreakdown.activities.toLocaleString()}\n`;
    pdfContent += `🍽️  Food: ₹${generatedItinerary.budgetBreakdown.food.toLocaleString()}\n`;
    pdfContent += `${'-'.repeat(70)}\n`;
    pdfContent += `Total: ₹${parseInt(generatedItinerary.budget).toLocaleString()}\n\n`;
    pdfContent += `Generated by My Travel Buddy\n`;
    pdfContent += `Date: ${new Date().toLocaleString()}\n`;

    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${generatedItinerary.destination.replace(/\s+/g, '-')}-Itinerary.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    alert('✅ Itinerary downloaded successfully!');
  };

  const sharePDF = () => {
    if (!generatedItinerary) return;

    const shareText = `Check out my ${generatedItinerary.days}-day trip to ${generatedItinerary.destination}! ${generatedItinerary.destinationIcon}✈️\n\nBudget: ₹${parseInt(generatedItinerary.budget).toLocaleString()}\nStyle: ${generatedItinerary.style}\nStay: ${generatedItinerary.accommodation}\nWeather: ${generatedItinerary.weather.condition} (${generatedItinerary.weather.temp})\n${generatedItinerary.hiddenGems ? '💎 Including Hidden Gems!' : ''}\n\nPlanned with My Travel Buddy`;

    if (navigator.share) {
      navigator.share({
        title: `${generatedItinerary.destination} Travel Plan`,
        text: shareText
      }).then(() => {
        console.log('Shared successfully');
      }).catch((err) => {
        if (err.name !== 'AbortError') {
          copyToClipboard(shareText);
        }
      });
    } else {
      copyToClipboard(shareText);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('✅ Itinerary details copied to clipboard!\n\nYou can now paste and share it!');
    }).catch(() => {
      alert('❌ Failed to copy. Please try again.');
    });
  };

  const handleClose = () => {
    if (confirm('Are you sure you want to close? All progress will be lost.')) {
      setCurrentStep(1);
      setFormData({
        destination: '',
        startDate: '',
        endDate: '',
        budget: '',
        travelers: '',
        style: '',
        accommodation: '',
        hiddenGems: false
      });
      setGeneratedItinerary(null);
      window.close();
      window.location.href = 'about:blank';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-t-3xl shadow-lg p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Plane className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-800">Plan Your Trip</h1>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Progress Bar */}
        {currentStep < 4 && (
          <div className="bg-white px-6 py-4">
            <div className="flex justify-between items-center mb-2">
              {['Destination', 'Preferences', 'Review'].map((step, idx) => (
                <div
                  key={idx}
                  className={`flex-1 text-center ${
                    currentStep > idx + 1
                      ? 'text-purple-600 font-semibold'
                      : currentStep === idx + 1
                      ? 'text-purple-600 font-bold'
                      : 'text-gray-400'
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`flex-1 h-2 rounded-full ${
                    currentStep >= step ? 'bg-purple-600' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-b-3xl shadow-lg p-8">
          {/* Step 1: Destination */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Where and When?</h2>
              
              <div>
                <label className="block text-gray-700 font-semibold mb-3">
                  🌍 Select Destination
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(destinations).map(([key, dest]) => (
                    <button
                      key={key}
                      onClick={() => setFormData({ ...formData, destination: key })}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        formData.destination === key
                          ? 'border-purple-600 bg-purple-50 shadow-lg scale-105'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="text-4xl mb-2">{dest.emoji}</div>
                      <div className="font-semibold text-gray-800">{dest.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    📅 Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    📅 End Date
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  disabled
                  className="flex-1 py-3 bg-gray-200 text-gray-400 rounded-lg font-semibold cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Preferences */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Travel Preferences</h2>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  💰 Total Budget (₹)
                </label>
                <input
                  type="number"
                  placeholder="e.g., 50000"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  🧑‍🤝‍🧑 Number of Travelers
                </label>
                <input
                  type="number"
                  placeholder="e.g., 2"
                  min="1"
                  value={formData.travelers}
                  onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  🎨 Travel Style
                </label>
                <select
                  value={formData.style}
                  onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none"
                >
                  <option value="">Select Style</option>
                  <option value="adventure">Adventure</option>
                  <option value="relaxation">Relaxation</option>
                  <option value="cultural">Cultural</option>
                  <option value="romantic">Romantic</option>
                  <option value="budget">Budget</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  🏨 Type of Stay
                </label>
                <select
                  value={formData.accommodation}
                  onChange={(e) => setFormData({ ...formData, accommodation: e.target.value })}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none"
                >
                  <option value="">Select Accommodation</option>
                  <option value="hotel">🏨 Hotel (Comfortable & Service)</option>
                  <option value="guesthouse">🏡 Guest House (Cozy & Budget)</option>
                  <option value="homestay">🏠 Homestay (Local Experience)</option>
                  <option value="resort">🌴 Resort (Luxury & Amenities)</option>
                  <option value="hostel">🛏️ Hostel (Backpacker Friendly)</option>
                </select>
              </div>

              <div className="bg-purple-50 rounded-xl p-4 border-2 border-purple-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {formData.hiddenGems ? (
                      <Eye className="w-6 h-6 text-purple-600" />
                    ) : (
                      <EyeOff className="w-6 h-6 text-gray-400" />
                    )}
                    <div>
                      <div className="font-semibold text-gray-800">
                        💎 Include Hidden Gems
                      </div>
                      <div className="text-sm text-gray-600">
                        Discover secret spots and off-beat attractions
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setFormData({ ...formData, hiddenGems: !formData.hiddenGems })}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                      formData.hiddenGems ? 'bg-purple-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                        formData.hiddenGems ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handlePrev}
                  className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Review Your Plan</h2>

              <div className="bg-gray-50 rounded-xl p-6 space-y-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">🌍 Destination:</span>
                  <span className="text-gray-800">{destinations[formData.destination]?.name || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">📅 Dates:</span>
                  <span className="text-gray-800">
                    {formData.startDate} to {formData.endDate} ({calculateDays()} days)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">💰 Budget:</span>
                  <span className="text-gray-800">₹{parseInt(formData.budget || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">🧑‍🤝‍🧑 Travelers:</span>
                  <span className="text-gray-800">{formData.travelers || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">🎨 Style:</span>
                  <span className="text-gray-800">
                    {formData.style ? formData.style.charAt(0).toUpperCase() + formData.style.slice(1) : 'Not set'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">🏨 Stay Type:</span>
                  <span className="text-gray-800">
                    {formData.accommodation ? formData.accommodation.charAt(0).toUpperCase() + formData.accommodation.slice(1) : 'Not set'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">💎 Hidden Gems:</span>
                  <span className="text-gray-800">{formData.hiddenGems ? 'Yes' : 'No'}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handlePrev}
                  className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Previous
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isGenerating}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
                >
                  {isGenerating ? '⏳ Generating...' : '🚀 Generate My Itinerary'}
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Full Itinerary Display */}
          {currentStep === 4 && generatedItinerary && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-purple-600 mb-2">🎉 Your Itinerary is Ready!</h2>
                <p className="text-gray-600">Review your personalized travel plan</p>
              </div>

              {/* Trip Summary */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border-2 border-purple-200">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <span>{generatedItinerary.destinationIcon}</span>
                  <span>{generatedItinerary.destination} {generatedItinerary.style} Adventure</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-gray-600 mb-1">Duration</div>
                    <div className="font-bold text-purple-600">{generatedItinerary.days} days</div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-gray-600 mb-1">Budget</div>
                    <div className="font-bold text-purple-600">₹{parseInt(generatedItinerary.budget).toLocaleString()}</div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-gray-600 mb-1">Travelers</div>
                    <div className="font-bold text-purple-600">{generatedItinerary.travelers}</div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-gray-600 mb-1">Stay Type</div>
                    <div className="font-bold text-purple-600">{generatedItinerary.accommodation}</div>
                  </div>
                </div>
                {generatedItinerary.hiddenGems && (
                  <div className="mt-4 bg-purple-100 rounded-lg p-3 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-purple-600" />
                    <span className="text-purple-800 font-semibold">Hidden Gems Included! 💎</span>
                  </div>
                )}
              </div>

              {/* Weather & Packing Section */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Cloud className="w-6 h-6 text-blue-600" />
                  Weather & Packing Guide
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Weather Info */}
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <span className="text-2xl">{generatedItinerary.weather.icon}</span>
                      <span>Expected Weather</span>
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Thermometer className="w-4 h-4 text-red-500" />
                        <span className="text-gray-600">Temperature:</span>
                        <span className="font-semibold">{generatedItinerary.weather.temp}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Sun className="w-4 h-4 text-yellow-500" />
                        <span className="text-gray-600">Condition:</span>
                        <span className="font-semibold">{generatedItinerary.weather.condition}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Wind className="w-4 h-4 text-blue-500" />
                        <span className="text-gray-600">Season:</span>
                        <span className="font-semibold capitalize">{generatedItinerary.weather.season}</span>
                      </div>
                    </div>
                  </div>

                  {/* Clothing Guide */}
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-bold text-gray-800 mb-3">👕 What to Pack</h4>
                    <div className="space-y-1.5 text-sm">
                      {generatedItinerary.weather.clothing.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-green-600 mt-0.5">✓</span>
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Medical Kit */}
                <div className="mt-4 bg-white rounded-lg p-4">
                  <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="text-red-600">🏥</span>
                    <span>Medical Kit Essentials</span>
                  </h4>
                  <div className="grid md:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
                    {generatedItinerary.weather.medicalKit.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-red-500 mt-0.5">+</span>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Day-by-Day Itinerary */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-purple-600" />
                  Day-by-Day Itinerary
                </h3>
                
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {generatedItinerary.dailyPlans.map((dayPlan) => (
                    <div key={dayPlan.day} className="bg-white border-2 border-gray-200 rounded-xl p-5 hover:border-purple-300 transition">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-lg font-bold text-gray-800">Day {dayPlan.day}</h4>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                          ₹{dayPlan.cost.toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        {dayPlan.places.map((place, idx) => (
                          <div key={idx} className="flex gap-3 items-start">
                            <div className={`mt-1 ${place.isHidden ? 'text-purple-600' : 'text-blue-600'}`}>
                              {place.isHidden ? '💎' : '📍'}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h5 className="font-semibold text-gray-800">{place.name}</h5>
                                {place.isHidden && (
                                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full font-semibold">
                                    Hidden Gem
                                  </span>
                                )}
                              </div>
                              <div className="text-sm text-gray-600 mt-1">
                                <span className="font-medium">{place.time}</span> • {place.activity}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Budget Breakdown */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-green-600" />
                  Budget Breakdown
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">✈️ Transportation & Flights</span>
                    <span className="font-bold text-gray-800">₹{generatedItinerary.budgetBreakdown.transportation.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">🏨 Accommodation ({generatedItinerary.accommodation})</span>
                    <span className="font-bold text-gray-800">₹{generatedItinerary.budgetBreakdown.accommodation.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">🎯 Activities & Attractions</span>
                    <span className="font-bold text-gray-800">₹{generatedItinerary.budgetBreakdown.activities.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">🍽️ Food & Dining</span>
                    <span className="font-bold text-gray-800">₹{generatedItinerary.budgetBreakdown.food.toLocaleString()}</span>
                  </div>
                  <div className="pt-3 border-t-2 border-green-300 flex justify-between items-center">
                    <span className="font-bold text-gray-800">Total Budget</span>
                    <span className="font-bold text-green-600 text-xl">₹{parseInt(generatedItinerary.budget).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <button
                  onClick={downloadPDF}
                  className="flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition transform hover:scale-105"
                >
                  <Download className="w-5 h-5" />
                  Download Itinerary
                </button>
                <button
                  onClick={sharePDF}
                  className="flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition transform hover:scale-105"
                >
                  <Share2 className="w-5 h-5" />
                  Share Trip
                </button>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition"
              >
                Close & Clear
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TravelPlanningApp;