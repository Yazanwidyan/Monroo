import React from "react";
import {
  FaClipboardList,
  FaGlassCheers,
  FaHandshake,
  FaStar,
  FaUserPlus,
} from "react-icons/fa";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const VerticalSteps = () => {
  return (
    <VerticalTimeline>
      <VerticalTimelineElement
        className="vertical-timeline-element--example"
        contentStyle={{ background: "#2D3748", color: "#fff" }}
        iconStyle={{ background: "black", color: "#fff" }}
        icon={<FaUserPlus />}
      >
        <h3 className="vertical-timeline-element-title">
          Step 1: Create Account
        </h3>
        <p>Register an account to start the process...</p>
      </VerticalTimelineElement>

      <VerticalTimelineElement
        className="vertical-timeline-element--example"
        contentStyle={{ background: "#2D3748", color: "#fff" }}
        iconStyle={{ background: "black", color: "#fff" }}
        icon={<FaClipboardList />}
      >
        <h3 className="vertical-timeline-element-title">
          Step 2: Review Applicants
        </h3>
        <p>Go through applicant submissions and reviews...</p>
      </VerticalTimelineElement>

      <VerticalTimelineElement
        className="vertical-timeline-element--example"
        contentStyle={{ background: "#2D3748", color: "#fff" }}
        iconStyle={{ background: "black", color: "#fff" }}
        icon={<FaHandshake />}
      >
        <h3 className="vertical-timeline-element-title">Step 3: Hire Talent</h3>
        <p>Select and onboard suitable talent...</p>
      </VerticalTimelineElement>

      <VerticalTimelineElement
        className="vertical-timeline-element--example"
        contentStyle={{ background: "#2D3748", color: "#fff" }}
        iconStyle={{ background: "black", color: "#fff" }}
        icon={<FaStar />}
      >
        <h3 className="vertical-timeline-element-title">Step 4: Rate</h3>
        <p>Rate and provide feedback for the hired talent...</p>
      </VerticalTimelineElement>
    </VerticalTimeline>
  );
};

export default VerticalSteps;
