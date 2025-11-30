import { useState } from 'react';
import Header from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Home, Upload, Palette, Bed, DollarSign, Send, CheckCircle, MessageCircle } from 'lucide-react';

const GetQuote = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    preferredStyle: '',
    customStyle: '',
    bedrooms: '',
    bathrooms: '',
    otherRooms: '',
    propertySize: '',
    budget: '',
    description: '',
    image: null as File | null,
  });

  const [uploadedFileName, setUploadedFileName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
      }));
      setUploadedFileName(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Format message for WhatsApp
    const message = `*Custom House Plan Quote Request*

*Personal Details:*
Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
City: ${formData.city}

*Design Preferences:*
Style: ${formData.preferredStyle === 'Other' ? formData.customStyle : formData.preferredStyle}
Bedrooms: ${formData.bedrooms}
Bathrooms: ${formData.bathrooms}
Other Rooms: ${formData.otherRooms || 'None specified'}

*Property Details:*
Property Size: ${formData.propertySize} sqm
Budget: ${formData.budget}

*Description:*
${formData.description}

${uploadedFileName ? `*Uploaded File:* ${uploadedFileName}` : ''}

Please contact me to discuss this quote.`;

    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/27726659790?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Show success message
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        city: '',
        preferredStyle: '',
        customStyle: '',
        bedrooms: '',
        bathrooms: '',
        otherRooms: '',
        propertySize: '',
        budget: '',
        description: '',
        image: null,
      });
      setUploadedFileName('');
    }, 3000);
  };

  const styleOptions = [
    'Modern',
    'Contemporary',
    'Traditional',
    'Mediterranean',
    'Farmhouse',
    'Tuscan',
    'Tuscan Roof',
    'Minimalist',
    'Craftsman',
    'Colonial',
    'Ranch',
    'Victorian',
    'Not sure',
    'Other',
  ];

  const budgetOptions = [
    'R500K - R1M',
    'R1M - R2M',
    'R2M - R3M',
    'R3M - R5M',
    'R5M - R10M',
    'R10M+',
    'Not sure yet',
  ];

  const sizeOptions = [
    '100 - 150',
    '150 - 200',
    '200 - 300',
    '300 - 400',
    '400 - 500',
    '500+',
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold mb-4">Get Your FREE Custom Quote</h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Tell us about your dream home and we'll provide a personalized design quote.
            </p>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex gap-4">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground">100% Free</h3>
                  <p className="text-sm text-muted-foreground">No hidden charges or obligations</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground">Quick Response</h3>
                  <p className="text-sm text-muted-foreground">Get a quote within 24 hours</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground">Professional Team</h3>
                  <p className="text-sm text-muted-foreground">Expert architects will review your request</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {submitted ? (
                <Card className="p-12 text-center bg-green-50 border-green-200">
                  <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-green-800 mb-2">Quote Submitted Successfully!</h2>
                  <p className="text-green-700 mb-4">
                    Your request has been sent to our team via WhatsApp. We'll review it and get back to you soon.
                  </p>
                  <Button onClick={() => window.location.reload()}>Start New Quote</Button>
                </Card>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Details Section */}
                  <Card className="p-8">
                    <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                      <span className="p-2 bg-primary/10 rounded">👤</span>
                      Personal Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                        <Input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Phone Number *</label>
                        <Input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+27 (0) 123 456 789"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">City *</label>
                        <Input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="Your city"
                          required
                        />
                      </div>
                    </div>
                  </Card>

                  {/* Design Preferences */}
                  <Card className="p-8">
                    <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                      <span className="p-2 bg-primary/10 rounded">🎨</span>
                      Design Preferences
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Preferred Style *</label>
                        <select
                          name="preferredStyle"
                          value={formData.preferredStyle}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        >
                          <option value="">Select a style</option>
                          {styleOptions.map(style => (
                            <option key={style} value={style}>{style}</option>
                          ))}
                        </select>
                        {formData.preferredStyle === 'Other' && (
                          <div className="mt-4">
                            <label className="block text-sm font-medium text-foreground mb-2">Describe Your Style *</label>
                            <Input
                              type="text"
                              name="customStyle"
                              value={formData.customStyle}
                              onChange={handleChange}
                              placeholder="e.g., Blend of Modern and Tuscan with minimalist interiors"
                              required
                            />
                          </div>
                        )}
                      </div>
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Bedrooms *</label>
                            <Input
                              type="number"
                              name="bedrooms"
                              value={formData.bedrooms}
                              onChange={handleChange}
                              placeholder="e.g., 3"
                              min="1"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Bathrooms *</label>
                            <Input
                              type="number"
                              name="bathrooms"
                              value={formData.bathrooms}
                              onChange={handleChange}
                              placeholder="e.g., 2"
                              min="1"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-foreground mb-2">Other Required Rooms</label>
                      <Textarea
                        name="otherRooms"
                        value={formData.otherRooms}
                        onChange={handleChange}
                        placeholder="e.g., Home office, gym, guest suite, entertainment area..."
                        rows={3}
                      />
                    </div>
                  </Card>

                  {/* Property Details */}
                  <Card className="p-8">
                    <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                      <span className="p-2 bg-primary/10 rounded">📐</span>
                      Property Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Stand/Yard Size (sqm) *</label>
                        <select
                          name="propertySize"
                          value={formData.propertySize}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        >
                          <option value="">Select size range</option>
                          {sizeOptions.map(size => (
                            <option key={size} value={size}>{size} sqm</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Budget *</label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        >
                          <option value="">Select budget range</option>
                          {budgetOptions.map(budget => (
                            <option key={budget} value={budget}>{budget}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </Card>

                  {/* Description & Upload */}
                  <Card className="p-8">
                    <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                      <span className="p-2 bg-primary/10 rounded">📝</span>
                      Tell Us More
                    </h2>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Project Description *</label>
                      <Textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe your vision for the home, any specific features, lifestyle needs, or inspiration..."
                        rows={5}
                        required
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        The more details you provide, the better we can understand your vision.
                      </p>
                    </div>

                    <div className="mt-6">
                      <label className="block text-sm font-medium text-foreground mb-2">Upload Sketches or Reference Images (Optional)</label>
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                        <input
                          type="file"
                          onChange={handleFileChange}
                          accept="image/*,.pdf,.sketch"
                          className="hidden"
                          id="file-upload"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <Upload className="h-8 w-8 text-primary mx-auto mb-2" />
                          <p className="text-sm font-medium text-foreground">Click to upload or drag and drop</p>
                          <p className="text-xs text-muted-foreground">PNG, JPG, PDF, SKETCH up to 10MB</p>
                          {uploadedFileName && (
                            <Badge className="mt-2 inline-block">{uploadedFileName}</Badge>
                          )}
                        </label>
                      </div>
                    </div>
                  </Card>

                  {/* Submit Button */}
                  <div className="flex gap-4">
                    <Button type="submit" size="lg" className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold">
                      <Send className="h-5 w-5" />
                      Send Quote Request to WhatsApp
                    </Button>
                  </div>

                  <p className="text-center text-sm text-muted-foreground">
                    By submitting, you agree to our terms and will be contacted via WhatsApp/Email.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Home className="h-6 w-6 text-primary-foreground" />
                  <span className="text-lg font-bold text-primary-foreground">Cedric House Planning</span>
                </div>
                <p className="text-sm">
                  Creating beautiful, functional house plans for your dream home.
                </p>
                <div className="flex gap-4">
                  <a href="https://www.facebook.com/MPHOCEDRICHOUSEPLANS" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                    <MessageCircle className="h-5 w-5" />
                  </a>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-primary-foreground mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/" className="hover:opacity-80 transition-opacity">Home</a></li>
                  <li><a href="/house-plans" className="hover:opacity-80 transition-opacity">House Plans</a></li>
                  <li><a href="/built-homes" className="hover:opacity-80 transition-opacity">Built Homes</a></li>
                  <li><a href="/services" className="hover:opacity-80 transition-opacity">Services</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-primary-foreground mb-4">More</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/about" className="hover:opacity-80 transition-opacity">About</a></li>
                  <li><a href="/contact" className="hover:opacity-80 transition-opacity">Contact</a></li>
                  <li><a href="#" className="hover:opacity-80 transition-opacity">FAQ</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-primary-foreground mb-4">Services</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:opacity-80 transition-opacity">Custom Design</a></li>
                  <li><a href="#" className="hover:opacity-80 transition-opacity">Plan Modifications</a></li>
                  <li><a href="/get-quote" className="hover:opacity-80 transition-opacity">Get Quote</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-primary-foreground mb-4">Support</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/contact" className="hover:opacity-80 transition-opacity">Contact Us</a></li>
                  <li><a href="https://wa.me/27726659790" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">WhatsApp</a></li>
                  <li><a href="#" className="hover:opacity-80 transition-opacity">Returns</a></li>
                </ul>
              </div>
            </div>
            
            <div className="pt-8 border-t border-primary-foreground/20 text-center text-sm">
              <p>© 2024 Cedric House Planning and Construction. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default GetQuote;
