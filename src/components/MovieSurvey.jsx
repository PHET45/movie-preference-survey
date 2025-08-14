import movies from "../data/Movies";
import { useState } from 'react'
import React from 'react'


const MovieSurvey = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        selectedMovie: '',
        comments: ''
      });
    
      const [errors, setErrors] = useState({});
      const [isSubmitted, setIsSubmitted] = useState(false);
    
      const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
          newErrors.name = 'โปรดใส่ชื่อของคุณ';
        }
        
        if (!formData.email.trim()) {
          newErrors.email = 'โปรดใส่อีเมลของคุณ';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง';
        }
        
        if (!formData.selectedMovie) {
          newErrors.selectedMovie = 'กรุณาเลือกหนังที่คุณชอบ';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
          setIsSubmitted(true);
        }
      };
    
      const handleReset = () => {
        setFormData({
          name: '',
          email: '',
          selectedMovie: '',
          comments: ''
        });
        setErrors({});
      };
    
      const handleNewSurvey = () => {
        setIsSubmitted(false);
        handleReset();
      };
    
      const getSelectedMovieTitle = () => {
        const movie = movies.find(m => m.title === formData.selectedMovie);
        return movie ? movie.title : '';
      };
    
      if (isSubmitted) {
        return (
          <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-center">
                สรุปผลแบบสำรวจ
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <span className="inline-block w-24 font-medium">ชื่อ:</span>
                <span>{formData.name}</span>
              </div>
              <div>
                <span className="inline-block w-24 font-medium">อีเมล:</span>
                <span>{formData.email}</span>
              </div>
              <div>
                <span className="inline-block w-24 font-medium">หนังที่เลือก:</span>
                <span>{getSelectedMovieTitle()}</span>
              </div>
              {formData.comments && (
                <div>
                  <span className="inline-block w-24 font-medium">ความคิดเห็น:</span>
                  <span>{formData.comments}</span>
                </div>
              )}
              
              <div className="pt-4 border-t border-gray-200">
                <button 
                  onClick={handleNewSurvey} 
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  ทำแบบสำรวจใหม่
                </button>
              </div>
            </div>
          </div>
        );
      }
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-center">
          แบบสำรวจความชอบภาพยนตร์
        </h2>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              ชื่อ*:
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              อีเมล*:
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              เลือกหนังที่คุณชอบ*:
            </label>
            <div className="space-y-2">
              {movies.map((movie, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={`movie-${index}`}
                    name="selectedMovie"
                    value={movie.title}
                    checked={formData.selectedMovie === movie.title}
                    onChange={(e) => setFormData({ ...formData, selectedMovie: e.target.value })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor={`movie-${index}`} className="flex-1 cursor-pointer text-sm">
                    {movie.title} ({movie.year}) - {movie.director}
                  </label>
                </div>
              ))}
            </div>
            {errors.selectedMovie && (
              <p className="text-red-500 text-sm">{errors.selectedMovie}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="comments" className="block text-sm font-medium text-gray-700">
              ความคิดเห็น (ถ้ามี):
            </label>
            <textarea
              id="comments"
              value={formData.comments}
              onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex space-x-4 pt-4 border-t border-gray-200">
            <button 
              type="button" 
              onClick={handleSubmit} 
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              ส่งแบบสำรวจ
            </button>
            <button 
              type="button" 
              onClick={handleReset} 
              className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors border border-gray-300"
            >
              รีเซ็ต
            </button>
          </div>

          {(errors.name || errors.email || errors.selectedMovie) && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-red-800 text-sm">
                * ข้อความแจ้งเตือน (ถ้าข้อมูลไม่ถูกต้อง)
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MovieSurvey