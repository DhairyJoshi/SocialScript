import axios from 'axios';
import React, { useState } from 'react';

export default function CampaignForm() {
    const [formData, setFormData] = useState({
        coreMessage: '',
        brandValue: '',
        ageRange: '',
        gender: '',
        location: '',
        interests: '',
        onlineBehavior: '',
        formatType: '',
        visualStyle: '',
        colorPalette: '',
        fontTypography: ''
    });

    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setShowModal(true);
        setLoading(true); // <-- Start loading
        setResponseData(null);

        // Prepare the data to match backend expectations
        const postData = {
            brand_values: formData.brandValue.split(',').map(val => val.trim()),  // convert to array
            campaign_message: formData.coreMessage,
            target_audience: {
                age: formData.ageRange,
                gender: formData.gender,
                location: formData.location,
                interests: formData.interests,
                online_behavior: formData.onlineBehavior
            },
            format_type: formData.formatType,
            visual_style: formData.visualStyle,
            color_palette: formData.colorPalette,
            typography: formData.fontTypography
        };

        try {
            const response = await axios.post('http://localhost:8000/api/generate-post', postData);
            
            const post = response.data.post;
            const headingMatch = post.match(/1\. Heading:\s*"([^"]+)"/);
            const visualLayoutMatch = post.match(/2\. Visual Layout Concept:\s*(.+)/);
            const ctaMatch = post.match(/3\. Suggested CTA:\s*(.+)/);
            const toneMatch = post.match(/4\. Tone and Design Direction:\s*(.+)/);

            setResponseData({
                heading: headingMatch ? headingMatch[1] : null,
                visual_layout_prompt: response.data.visual_layout_prompt || (visualLayoutMatch ? visualLayoutMatch[1] : null),
                cta: ctaMatch ? ctaMatch[1] : null,
                tone_direction: toneMatch ? toneMatch[1] : null,
                image_url: response.data.image_url,
            });

            console.log(response.data);
            // setResponseData({ post: 'Wait' });
        } catch (error) {
            setResponseData({ post: 'An error occurred while generating the post.' });
        } finally {
            setLoading(false); // <-- Stop loading
        }
    };

    const closeModal = () => setShowModal(false);

    return (
        <>
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-8">
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800">Campaign Information</h2>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Core Message</label>
                        <textarea
                            name="coreMessage"
                            value={formData.coreMessage}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            rows={3}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Core Brand Values</label>
                        <input
                            type="text"
                            name="brandValue"
                            value={formData.brandValue}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800">Target Audience</h2>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Age Range</label>
                            <input
                                type="text"
                                name="ageRange"
                                value={formData.ageRange}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Gender</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="all">All</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Top Interests</label>
                            <input
                                type="text"
                                name="interests"
                                value={formData.interests}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Online Behavior</label>
                        <textarea
                            name="onlineBehavior"
                            value={formData.onlineBehavior}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            rows={3}
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800">Design Information</h2>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Format Type</label>
                            <select
                                name="formatType"
                                value={formData.formatType}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">Select a format</option>
                                <option value="Instagram carousel">Instagram carousel</option>
                                <option value="Instagram post">Instagram post</option>
                                <option value="Instagram story">Instagram story</option>
                                <option value="Facebook Post">Facebook Post</option>
                                <option value="728x90 Banner">728x90 Banner</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Visual Style</label>
                            <select
                                name="visualStyle"
                                value={formData.visualStyle}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">Select a style</option>
                                <option value="Minimal">Minimal</option>
                                <option value="Bold">Bold</option>
                                <option value="Lifestyle">Lifestyle</option>
                                <option value="Elegant">Elegant</option>
                                <option value="Playful">Playful</option>
                                <option value="Futuristic">Futuristic</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Color Palette</label>
                            <select
                                name="colorPalette"
                                value={formData.colorPalette}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">Select a palette</option>
                                <option value="Pastel Tones">Pastel Tones</option>
                                <option value="Neon Gradients">Neon Gradients</option>
                                <option value="Monochrome">Monochrome</option>
                                <option value="Earthy Neutrals">Earthy Neutrals</option>
                                <option value="Vibrant Pop Colors">Vibrant Pop Colors</option>
                                <option value="Dark Mode">Dark Mode</option>
                                <option value="Muted Vintage">Muted Vintage</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Font Typography</label>
                            <select
                                name="fontTypography"
                                value={formData.fontTypography}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">Select a typography</option>
                                <option value="Modern (Sans-serif)">Modern (Sans-serif)</option>
                                <option value="Classic (Serif)">Classic (Serif)</option>
                                <option value="Handwritten">Handwritten</option>
                                <option value="Monospace (Techy)">Monospace (Techy)</option>
                                <option value="Elegant Script">Elegant Script</option>
                                <option value="Bold Display">Bold Display</option>
                                <option value="Minimalist Thin">Minimalist Thin</option>
                            </select>
                        </div>

                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                >
                    Submit Campaign
                </button>
            </form>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-300 bg-opacity-50">
                    <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
                        <div className="flex justify-between items-center border-b pb-3">
                            <h3 className="text-xl font-semibold text-gray-900">Suggested Output</h3>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                                ✕
                            </button>
                        </div>

                        <div className="mt-4 space-y-6 flex flex-col items-center justify-center">
                            {loading ? (
                                // Spinner
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                                    <p className="mt-4 text-gray-500">Generating your post...</p>
                                </div>
                            ) : (
                                <>
                                    {/* Display Each Section */}
                                    <div className="w-full text-center">
                                        <h4 className="text-lg font-bold text-gray-800 mb-2">Heading</h4>
                                        <p className="text-gray-600">{responseData?.heading || 'N.A.'}</p>
                                    </div>

                                    <div className="w-full text-center">
                                        <h4 className="text-lg font-bold text-gray-800 mb-2">Visual Layout Concept</h4>
                                        <p className="text-gray-600">{responseData?.visual_layout_prompt || 'N.A.'}</p>
                                    </div>

                                    <div className="w-full text-center">
                                        <h4 className="text-lg font-bold text-gray-800 mb-2">Suggested CTA</h4>
                                        <p className="text-gray-600">{responseData?.cta || 'N.A.'}</p>
                                    </div>

                                    <div className="w-full text-center">
                                        <h4 className="text-lg font-bold text-gray-800 mb-2">Tone and Design Direction</h4>
                                        <p className="text-gray-600">{responseData?.tone_direction || 'N.A.'}</p>
                                    </div>

                                    {/* Display Image if available */}
                                    {responseData?.image_url && (
                                        <img
                                            src={responseData.image_url}
                                            alt="Generated Visual"
                                            className="mt-6 rounded-lg max-w-full h-auto"
                                        />
                                    )}
                                </>
                            )}
                        </div>

                        <div className="mt-6 flex justify-end gap-4">
                            {/* Download Image Button */}
                            <a
                                href={responseData?.image_url}
                                download="generated_image.png"
                                target="_blank"
                                className="w-1/3 h-[3rem] bg-indigo-500 cursor-pointer rounded-md text-white hover:bg-indigo-600 flex items-center justify-center border-none hover:bg-primary [&:hover>svg]:stroke-ternary transition-all duration-500"
                            >
                                Download Image
                            </a>

                            {/* Copy Text Button */}
                            <button
                                onClick={async () => {
                                    if (responseData) {
                                        const textToCopy = `
Heading: ${responseData.heading || 'N/A'}

Visual Layout Concept: ${responseData.visual_layout_prompt || 'N/A'}

Suggested CTA: ${responseData.cta || 'N/A'}

Tone and Design Direction: ${responseData.tone_direction || 'N/A'}
                `;
                                        try {
                                            await navigator.clipboard.writeText(textToCopy.trim());
                                            alert('Text content copied to clipboard!');
                                        } catch (err) {
                                            console.error('Failed to copy text: ', err);
                                            alert('Failed to copy text. Please try manually.');
                                        }
                                    } else {
                                        alert('No content available to copy.');
                                    }
                                }}
                                className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                            >
                                Copy Text
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </>
    );
}