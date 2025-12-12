import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
  onClick?: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img 
            src={job.logo} 
            alt={job.company} 
            className="w-12 h-12 rounded-lg object-cover bg-gray-50 border border-gray-100"
          />
          <div>
            <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
              {job.title}
            </h3>
            <p className="text-sm text-gray-500">{job.company}</p>
          </div>
        </div>
        <span className="text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-full text-sm">
          {job.salary}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.tags.map((tag, index) => (
          <span 
            key={index} 
            className="text-xs px-2.5 py-1 bg-gray-50 text-gray-600 rounded-md border border-gray-100"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-50 pt-3">
        <div className="flex items-center space-x-3">
          <span className="flex items-center">
            <MapPin className="w-3 h-3 mr-1" />
            {job.location}
          </span>
          <span className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {job.postedAt}
          </span>
        </div>
        <span className="text-indigo-600 font-medium">内推可查进度</span>
      </div>
    </div>
  );
};

export default JobCard;