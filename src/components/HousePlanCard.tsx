import { Bed, Bath, Square, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface HousePlanCardProps {
  image: string;
  title: string;
  beds: number;
  baths: number;
  sqft: string;
  price: string;
  isBestseller?: boolean;
}

const HousePlanCard = ({ 
  image, 
  title, 
  beds, 
  baths, 
  sqft, 
  price,
  isBestseller = false 
}: HousePlanCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in">
      <div className="relative overflow-hidden">
        {isBestseller && (
          <Badge className="absolute top-4 right-4 z-10 bg-primary">
            Bestseller
          </Badge>
        )}
        <img 
          src={image} 
          alt={title} 
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm p-2 rounded-full hover:bg-card transition-colors">
          <Heart className="h-5 w-5 text-foreground hover:text-primary hover:fill-primary transition-colors" />
        </button>
      </div>
      
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            <span>{beds} Beds</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            <span>{baths} Baths</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="h-4 w-4" />
            <span>{sqft} sq ft</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <span className="text-2xl font-bold text-primary">${price}</span>
          <Button>View Plan</Button>
        </div>
      </div>
    </Card>
  );
};

export default HousePlanCard;
