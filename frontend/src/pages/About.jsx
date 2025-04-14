import { Users, Target, Lightbulb } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">About Social Script</h1>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-center mb-4">
              <Users size={32} className="text-indigo-600" />
            </div>
            <h2 className="text-xl font-semibold text-center mb-4">Target Audience</h2>
            <p className="text-gray-600 text-center">
              Define and understand your target audience to create more effective campaigns.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-center mb-4">
              <Target size={32} className="text-indigo-600" />
            </div>
            <h2 className="text-xl font-semibold text-center mb-4">Campaign Strategy</h2>
            <p className="text-gray-600 text-center">
              Develop comprehensive campaign strategies that align with your business goals.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-center mb-4">
              <Lightbulb size={32} className="text-indigo-600" />
            </div>
            <h2 className="text-xl font-semibold text-center mb-4">Creative Design</h2>
            <p className="text-gray-600 text-center">
              Create visually appealing designs that capture your audience's attention.
            </p>
          </div>
        </div>

        <div className="mt-16 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            We're dedicated to helping businesses create impactful marketing campaigns that resonate with their target audience. 
            Our platform simplifies the campaign creation process while ensuring all crucial elements are considered and implemented.
          </p>
        </div>
      </div>
    </div>
  );
}