import CampaignForm from '../components/CampaignForm';
import { Image } from 'lucide-react';

export default function Generator() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Image size={48} className="text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Campaign Image Generator</h1>
          <p className="text-lg text-gray-600">Fill in the campaign details to generate your perfect marketing visuals</p>
        </div>
        <CampaignForm />
      </div>
    </div>
  );
}