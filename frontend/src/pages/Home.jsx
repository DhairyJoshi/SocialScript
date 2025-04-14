import { Palette } from 'lucide-react';
import CampaignForm from '../components/CampaignForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Palette size={48} className="text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Campaign Builder</h1>
          <p className="text-lg text-gray-600">Create your perfect marketing campaign with our easy-to-use form</p>
        </div>
        <CampaignForm />
      </div>
    </div>
  );
}