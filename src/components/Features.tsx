import React from 'react';
import { Award, ShieldCheck, Flame, Sun } from 'lucide-react';

export const Features: React.FC = () => {
  const featuresList = [
    {
      icon: <Award size={28} />,
      title: "Generational Recipes",
      description: "Every blend and pickle is crafted using time-tested recipes preserved and passed down for decades."
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "100% Pure & Clean",
      description: "Zero preservatives, zero artificial colors or chemical additives. Just nature's raw goodness."
    },
    {
      icon: <Flame size={28} />,
      title: "Small-Batch Crafted",
      description: "Made in limited quantities with personal supervision to ensure home-style flavor and consistency."
    },
    {
      icon: <Sun size={28} />,
      title: "Sun-Dried & Natural",
      description: "Using traditional preservation techniques like slow sun-drying to retain essential nutrients and oils."
    }
  ];

  return (
    <section className="section features" id="features">
      <div className="container">
        <div className="features-grid">
          {featuresList.map((item, idx) => (
            <div className="feature-card" key={idx}>
              <div className="feature-icon-wrapper">
                {item.icon}
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
