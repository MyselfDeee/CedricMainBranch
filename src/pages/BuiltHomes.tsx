import React, { useState, useMemo } from 'react';
import { Grid3x3, List, CircleHelp, Heart, Home, Bed, Bath, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { builtHomes } from '@/data/builtHomes';
import { FilterState, SortOption, HousePlan } from '@/types/housePlan';
import { cn } from '@/lib/utils';
import { ImageGallery } from '@/components/ImageGallery';
import { FilterSidebar } from '@/components/FilterSidebar';
import Header from '@/components/Header';

// BuiltHomeCard Component
function BuiltHomeCard({ plan }: { plan: HousePlan }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div 
          className="relative aspect-[4/3] overflow-hidden bg-muted cursor-pointer group"
          onClick={() => setIsGalleryOpen(true)}
        >
          <img
            src={plan.images[currentImageIndex]}
            alt={plan.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium bg-black/50 px-4 py-2 rounded-full">
              View All {plan.images.length} Photos
            </span>
          </div>
          
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge className="bg-green-600 text-white">Completed</Badge>
            {plan.isPopular && (
              <Badge className="bg-accent text-accent-foreground">Featured</Badge>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
            className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
          >
            <Heart
              className={cn(
                'w-5 h-5',
                isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
              )}
            />
          </button>

          {plan.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {plan.images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all',
                    index === currentImageIndex
                      ? 'bg-white w-4'
                      : 'bg-white/50 hover:bg-white/75'
                  )}
                />
              ))}
            </div>
          )}
        </div>

        <ImageGallery
          images={plan.images}
          initialIndex={currentImageIndex}
          isOpen={isGalleryOpen}
          onClose={() => setIsGalleryOpen(false)}
          title={plan.title}
        />

        <div className="p-5">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {plan.title}
          </h3>
          <p className="text-2xl font-bold text-primary mb-4">
            ${plan.price.toLocaleString()}
          </p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Home className="w-4 h-4" />
                <span>{plan.floorArea} m²</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Bed className="w-4 h-4" />
                <span>{plan.bedrooms} Bedrooms</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Bath className="w-4 h-4" />
                <span>{plan.bathrooms} Bathrooms</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Car className="w-4 h-4" />
                <span>{plan.garage} Garage</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4 pb-4 border-b">
            <span>{plan.levels} Level{plan.levels > 1 ? 's' : ''}</span>
            <span>{plan.width}m × {plan.depth}m</span>
          </div>

          <div className="flex gap-3">
            <Button className="flex-1" size="lg">
              View Details
            </Button>
            {plan.videoUrl && (
              <Button 
                size="lg"
                onClick={() => setShowVideo(true)}
                className="flex-1 bg-red-400 hover:bg-red-500 text-white font-semibold shadow-md hover:shadow-lg transition-all"
              >
                <svg className="w-4 h-4 mr-2 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Video
              </Button>
            )}
          </div>
        </div>
      </Card>

      {showVideo && plan.videoUrl && (
        <div 
          className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          onClick={() => setShowVideo(false)}
        >
          <div 
            className="w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              width="100%"
              height="100%"
              src={plan.videoUrl + "?autoplay=1&mute=1&loop=1&playlist=" + plan.videoUrl.split('/').pop()}
              title={plan.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <button
            onClick={() => setShowVideo(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}

// Main BuiltHomes Page Component
export const BuiltHomes = () => {
  const [filters, setFilters] = useState<FilterState>({});
  const [sortBy, setSortBy] = useState<SortOption>('floor-area');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const itemsPerPage = 6;

  // Filter and sort built homes
  const filteredAndSortedPlans = useMemo(() => {
    let filtered = [...builtHomes];

    // Apply filters
    if (filters.priceMin) {
      filtered = filtered.filter((plan) => plan.price >= filters.priceMin!);
    }
    if (filters.priceMax) {
      filtered = filtered.filter((plan) => plan.price <= filters.priceMax!);
    }
    if (filters.bedrooms && filters.bedrooms.length > 0) {
      filtered = filtered.filter((plan) =>
        filters.bedrooms!.some((bed) => plan.bedrooms >= bed)
      );
    }
    if (filters.bathrooms && filters.bathrooms.length > 0) {
      filtered = filtered.filter((plan) =>
        filters.bathrooms!.some((bath) => plan.bathrooms >= bath)
      );
    }
    if (filters.levels && filters.levels.length > 0) {
      filtered = filtered.filter((plan) => filters.levels!.includes(plan.levels));
    }
    if (filters.floorAreaMin) {
      filtered = filtered.filter((plan) => plan.floorArea >= filters.floorAreaMin!);
    }
    if (filters.floorAreaMax) {
      filtered = filtered.filter((plan) => plan.floorArea <= filters.floorAreaMax!);
    }
    if (filters.garage && filters.garage.length > 0) {
      filtered = filtered.filter((plan) =>
        filters.garage!.some((gar) => plan.garage >= gar)
      );
    }
    if (filters.styles && filters.styles.length > 0) {
      filtered = filtered.filter((plan) =>
        plan.style.some((s) => filters.styles!.includes(s))
      );
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'popular':
        filtered.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
        break;
      case 'floor-area':
        filtered.sort((a, b) => b.floorArea - a.floorArea);
        break;
    }

    return filtered;
  }, [filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedPlans.length / itemsPerPage);
  const paginatedPlans = filteredAndSortedPlans.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleClearFilters = () => {
    setFilters({});
    setCurrentPage(1);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        <div className="flex">
          {/* Filter Sidebar */}
          <FilterSidebar onFilterChange={setFilters} onClearAll={handleClearFilters} />

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="border-b bg-background sticky top-0 z-10">
              <div className="px-8 py-6">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-3xl font-bold text-foreground">
                    Built Homes Showcase
                  </h1>
                  <div className="flex items-center gap-3">
                    {/* Sort Dropdown */}
                    <Select
                      value={sortBy}
                      onValueChange={(value) => setSortBy(value as SortOption)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="floor-area">Floor Area</SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="price-high">Price High → Low</SelectItem>
                        <SelectItem value="price-low">Price Low → High</SelectItem>
                        <SelectItem value="popular">Most Popular</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* View Toggle */}
                    <div className="flex gap-1 border rounded-md p-1">
                      <Button
                        variant={viewMode === 'grid' ? 'default' : 'ghost'}
                        size="icon"
                        onClick={() => setViewMode('grid')}
                        className="h-8 w-8"
                      >
                        <Grid3x3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === 'list' ? 'default' : 'ghost'}
                        size="icon"
                        onClick={() => setViewMode('list')}
                        className="h-8 w-8"
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Showing {filteredAndSortedPlans.length} results
                </p>
              </div>
            </div>

            {/* Built Homes Grid */}
            <div className="p-8">
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {paginatedPlans.map((plan) => (
                  <BuiltHomeCard key={plan.id} plan={plan} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                          className={
                            currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'
                          }
                        />
                      </PaginationItem>

                      {[...Array(Math.min(totalPages, 3))].map((_, i) => {
                        const pageNum = i + 1;
                        return (
                          <PaginationItem key={pageNum}>
                            <PaginationLink
                              onClick={() => setCurrentPage(pageNum)}
                              isActive={currentPage === pageNum}
                              className="cursor-pointer"
                            >
                              {pageNum}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      })}

                      {totalPages > 4 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}

                      {totalPages > 3 && (
                        <PaginationItem>
                          <PaginationLink
                            onClick={() => setCurrentPage(totalPages)}
                            isActive={currentPage === totalPages}
                            className="cursor-pointer"
                          >
                            {totalPages}
                          </PaginationLink>
                        </PaginationItem>
                      )}

                      <PaginationItem>
                        <PaginationNext
                          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                          className={
                            currentPage === totalPages
                              ? 'pointer-events-none opacity-50'
                              : 'cursor-pointer'
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Help Button */}
        <Button
          size="lg"
          className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg"
        >
          <CircleHelp className="h-6 w-6" />
        </Button>
      </div>
    </>
  );
};

export default BuiltHomes;
