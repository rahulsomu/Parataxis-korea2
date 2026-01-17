import React, { useState } from "react";
// import { TEAM_MEMBERS } from "../../../constants";
import TeamMemberCard from "./TeamMemberCard";
import {
  ArrowRight,
  ExternalLink,
  Linkedin,
  Mail,
  Twitter,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import { useTranslation } from "../../context/LanguageProvider";
import { useTheme } from "../../context/ThemeProvider";

const Modal = ({ isOpen, onClose, teamMember }) => {
  if (!isOpen) return null;

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[200] flex items-center justify-center p-4 md:p-8"
      onClick={handleBackgroundClick}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white max-w-3xl w-full max-h-[90vh] overflow-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-black hover:text-orange-600 z-10"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative">
            <div className="aspect-square w-full">
              <ImageWithFallback
                src={teamMember.image}
                alt={`${teamMember.name} - ${teamMember.designation}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
              <div className="flex gap-3 text-white">
                {teamMember.linkedin && (
                  <a
                    href="#"
                    className="p-2 bg-black/30 backdrop-blur-sm rounded-full hover:bg-orange-600 transition-colors"
                  >
                    <Linkedin size={18} />
                  </a>
                )}
                {teamMember.twitter && (
                  <a
                    href="#"
                    className="p-2 bg-black/30 backdrop-blur-sm rounded-full hover:bg-orange-600 transition-colors"
                  >
                    <Twitter size={18} />
                  </a>
                )}
                {/* <a
                  href="#"
                  className="p-2 bg-black/30 backdrop-blur-sm rounded-full hover:bg-orange-600 transition-colors"
                >
                  <Mail size={18} />
                </a> */}
              </div>
            </div>
          </div>

          <div className="p-8 md:p-10">
            <div className="text-[10px] font-black text-orange-600 uppercase tracking-[0.3em] mb-3">
              {teamMember.department}
            </div>
            <h3 className="text-3xl font-black tracking-tighter mb-2">
              {teamMember.name}
            </h3>
            <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6">
              {teamMember.designation}
            </div>

            <div className="text-slate-800 space-y-4">{teamMember.bio}</div>

            {/* {teamMember.achievements && (
              <div className="mt-8">
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                  Key Achievements
                </div>
                <ul className="space-y-2">
                  {teamMember.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-orange-600 rounded-full flex-shrink-0 mt-2"></div>
                      <span className="text-sm text-slate-700">
                        {achievement}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )} */}

            {/* <div className="mt-10 pt-6 border-t border-slate-100">
              <a
                href="#"
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:text-orange-600 transition-colors"
              >
                Full Team Profile <ExternalLink size={14} />
              </a>
            </div> */}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const TeamSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);
  const { t } = useTranslation();
  const { isDayMode } = useTheme();
  const TEAM_MEMBERS = Object.values(t.teamMembers);

  const handleTeamMemberClick = (member) => {
    setSelectedTeamMember(member);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section
      id="team"
      className={`py-32 ${isDayMode ? "bg-slate-50" : "bg-slate-950"}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24">
          <div className="text-xs font-black text-orange-600 uppercase tracking-[0.5em] mb-6">
            {t.team.heading}
          </div>
          <h3
            className={`text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6 ${
              isDayMode ? "text-black" : "text-white"
            }`}
          >
            {t.team.title}
          </h3>
          <div className="max-w-2xl">
            <p
              className={`text-lg ${
                isDayMode ? "text-slate-500" : "text-slate-400"
              } leading-relaxed`}
            >
              {t.team.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              onClick={handleTeamMemberClick}
            />
          ))}
        </div>

        {/* <div className="mt-20 flex justify-center">
          <a
            href="#"
            className={`flex items-center gap-2 px-10 py-4 border-2 ${
              isDayMode
                ? "border-black hover:bg-black hover:text-white"
                : "border-white text-white hover:bg-white hover:text-black"
            } text-[11px] font-black uppercase tracking-widest transition-all`}
          >
            <span>{t.team.viewFull}</span>
            <ArrowRight size={16} />
          </a>
        </div> */}
      </div>

      {/* Team Member Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        teamMember={selectedTeamMember}
      />
    </section>
  );
};

export default TeamSection;
