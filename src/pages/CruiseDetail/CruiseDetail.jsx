import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Star, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

import CruiseFeatures from "./CruiseFeatures";
import CruiseRoom from "./CruiseRoom";
import CruiseIntroduce from "./CruiseIntroduce";
import CruiseReviews from "./CruiseReviews";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import serviceCruise from "../../data/mocks/Services/cruises.json";

const CruiseDetail = () => {
  const navigate = useNavigate();
  const { cruiseSlug } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const mapUrl = import.meta.env.VITE_GOOGLE_MAPS_URL;
  
  const cruise = serviceCruise.find((item) => item.to === `/${cruiseSlug}`);

  useEffect(() => {
    if (!cruise) {
      navigate("/404", { replace: true });
    }
  }, [cruise, navigate]);

  if (!cruise) return null;

  const { images, name, price, location, rating } = cruise;

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-20 py-20">
      <div>
        <div className="flex flex-col lg:flex-row gap-10 justify-between items-start mb-6 pb-20 container lg:w-6xl px-5 lg:px-0 mx-auto">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{name}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <div className="bg-amber-100 text-amber-800 rounded-full px-3 py-1 text-sm flex items-center">
                <Star className="w-4 h-4 mr-1 fill-amber-500 text-amber-500" />
                <span className="font-medium">{rating.score}</span>
                <span className="text-gray-600 ml-1">({rating.count} đánh giá)</span>
              </div>

              <div className="flex items-center text-gray-600 text-sm">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{location}</span>
              </div>

              <button onClick={() => scrollToSection("cruise-map")} className="text-teal-500 text-sm hover:underline">
                Xem bản đồ và lịch trình
              </button>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="text-teal-700 text-2xl md:text-3xl font-bold text-right">{price.toLocaleString("vi-VN")} đ/khách</div>
          </div>
        </div>

        <div className="relative mt-4 mb-8">
          <div className="w-full h-[28rem] md:h-[32rem] overflow-hidden rounded-lg relative">
            <img src={images[currentImageIndex]} alt={`Hình ${currentImageIndex + 1}`} className="w-full h-full object-cover" />
          </div>
          <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100">
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {images.map((image, index) => (
            <button key={index} onClick={() => goToImage(index)} className={`relative rounded-lg overflow-hidden border-2 transition-all ${currentImageIndex === index ? "border-teal-500 scale-105" : "border-transparent opacity-80"}`}>
              <img src={image} alt={`Thumbnail ${index + 1}`} className="w-16 h-12 md:w-20 md:h-16 object-cover" />
            </button>
          ))}
        </div>
      </div>
      <CruiseFeatures />
      <CruiseRoom />
      <CruiseIntroduce />
      <SectionHeader id="cruise-map" title="Bản đồ và lịch trình" description="Du thuyền xuất phát từ Cảng tàu khách quốc tế Hạ Long, Quảng Ninh" className="px-8 py-20">
        <div className="h-96">
          <iframe className="w-full h-full" src={mapUrl} allowFullScreen loading="lazy"></iframe>
        </div>
      </SectionHeader>
      <CruiseReviews />
    </div>
  );
};

export default CruiseDetail;
