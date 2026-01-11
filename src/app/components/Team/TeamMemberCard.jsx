import React from 'react';
import { ImageWithFallback } from '../ui/ImageWithFallback';
const TeamMemberCard = ({ member, onClick }) => {
  return (
    <div 
      onClick={() => onClick(member)} 
      className="cursor-pointer group"
    >
      <div className="aspect-square overflow-hidden mb-4 bg-slate-100">
        <ImageWithFallback 
          src={member.image} 
          alt={`${member.name} - ${member.title}`} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <h4 className="text-lg font-black tracking-tighter mb-1 group-hover:text-orange-600 transition-colors">{member.name}</h4>
      <div className="text-xs text-slate-500 font-medium">{member.title}</div>
    </div>
  );
};

export default TeamMemberCard;