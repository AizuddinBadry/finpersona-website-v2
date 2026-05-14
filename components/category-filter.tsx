"use client";
import {useState} from "react";
import {BookOpen, Dumbbell, HeartPulse, GraduationCap, Laptop, Baby, Users} from "lucide-react";

const categories = [
  {id:"all",label:"All",count:248},
  {id:"books",label:"Books",count:62,Icon:BookOpen},
  {id:"courses",label:"Courses",count:38,Icon:GraduationCap},
  {id:"sports",label:"Sports",count:44,Icon:Dumbbell},
  {id:"medical",label:"Medical",count:29,Icon:HeartPulse},
  {id:"lifestyle",label:"Lifestyle",count:35,Icon:Laptop},
  {id:"kids",label:"Childcare",count:18,Icon:Baby},
  {id:"parents",label:"For parents",count:22,Icon:Users},
];

export default function CategoryFilter() {
  const [active, setActive] = useState("all");
  return (
    <div className="mkt-cats">
      <div className="container">
        <div className="mkt-cats-row">
          {categories.map(c => (
            <button
              key={c.id}
              className={`cat-chip${active===c.id?" active":""}`}
              onClick={() => setActive(c.id)}
            >
              {c.Icon && <c.Icon size={13} />}
              {c.label} <span className="count">{c.count}</span>
            </button>
          ))}
          <input className="mkt-search" placeholder="Search 248 products…" />
        </div>
      </div>
    </div>
  );
}
