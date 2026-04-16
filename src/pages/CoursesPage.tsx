import React, { useState } from "react";
import { ExternalLink, Star, Clock, CheckCircle2 } from "lucide-react";
import { courseList } from "../data/courses";
import SearchBar from "../components/SearchBar";
import Badge from "../components/Badge";

const levels = ["All", "Beginner", "Intermediate", "Advanced"];
const categories = ["All", ...Array.from(new Set(courseList.map((c) => c.category)))];

const levelBadge: Record<string, "success" | "warning" | "error"> = {
  Beginner: "success",
  Intermediate: "warning",
  Advanced: "error",
};

const CoursesPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [activeLevel, setActiveLevel] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = courseList.filter((c) => {
    const matchSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor.toLowerCase().includes(search.toLowerCase()) ||
      c.platform.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchLevel = activeLevel === "All" || c.level === activeLevel;
    const matchCat = activeCategory === "All" || c.category === activeCategory;
    return matchSearch && matchLevel && matchCat;
  });

  const totalProgress = courseList
    .filter((c) => c.enrolled && (c.progress ?? 0) > 0)
    .reduce((acc, c) => acc + (c.progress ?? 0), 0) / courseList.filter((c) => c.enrolled).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          📚 Courses
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Track your learning journey across all platforms</p>
      </div>

      {/* Overall progress */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-medium text-white/80">Overall Learning Progress</p>
            <p className="text-3xl font-bold">{Math.round(totalProgress)}%</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-white/80">{courseList.filter((c) => c.progress === 100).length} Completed</p>
            <p className="text-sm text-white/80">{courseList.filter((c) => c.enrolled && (c.progress ?? 0) > 0 && (c.progress ?? 0) < 100).length} In Progress</p>
          </div>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-1000"
            style={{ width: `${totalProgress}%` }}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-3">
        <SearchBar value={search} onChange={setSearch} placeholder="Search courses, instructors, platforms..." />
        <div className="flex flex-wrap gap-2">
          {levels.map((lv) => (
            <button
              key={lv}
              onClick={() => setActiveLevel(lv)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeLevel === lv
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                  : "bg-gray-100 dark:bg-white/8 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/12"
              }`}
            >
              {lv}
            </button>
          ))}
          <div className="w-px bg-gray-200 dark:bg-white/10 mx-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/25"
                  : "bg-gray-100 dark:bg-white/8 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/12"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">📚</p>
          <p className="text-gray-500 dark:text-gray-400">No courses found.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map((course) => {
            const progress = course.progress ?? 0;
            const isComplete = progress === 100;
            return (
              <div
                key={course.id}
                className={`group relative rounded-2xl bg-white dark:bg-white/5 border overflow-hidden hover:shadow-xl transition-all duration-300 ${
                  isComplete
                    ? "border-emerald-200 dark:border-emerald-500/30 hover:shadow-emerald-500/10"
                    : "border-black/8 dark:border-white/8 hover:border-blue-500/50 hover:shadow-blue-500/10"
                }`}
              >
                {isComplete && (
                  <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-emerald-500">
                    <CheckCircle2 size={14} className="absolute -top-9 -right-0.5 text-white" />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/20 flex items-center justify-center text-2xl flex-shrink-0">
                      {course.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 mb-1">{course.title}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{course.instructor} · {course.platform}</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">{course.description}</p>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <Badge variant={levelBadge[course.level]}>{course.level}</Badge>
                    <Badge variant="info">{course.category}</Badge>
                    {course.isFree && <Badge variant="success">Free</Badge>}
                    {!course.isFree && !course.enrolled && <Badge variant="default">Paid</Badge>}
                  </div>

                  <div className="flex items-center gap-3 mb-4 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={11} className={i < Math.round((course.rating / 5) * 5) ? "text-amber-400 fill-amber-400" : "text-gray-300 dark:text-gray-600"} />
                      ))}
                      <span className="ml-0.5">{course.rating}</span>
                    </div>
                  </div>

                  {course.enrolled && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Progress</span>
                        <span className={`text-xs font-bold ${isComplete ? "text-emerald-500" : "text-blue-500"}`}>{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-white/10 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isComplete
                              ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                              : "bg-gradient-to-r from-blue-500 to-cyan-500"
                          }`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <a
                    href={course.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-medium transition-all shadow-lg ${
                      isComplete
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:opacity-90 shadow-emerald-500/20"
                        : course.enrolled
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:opacity-90 shadow-blue-500/20"
                        : "bg-gray-100 dark:bg-white/8 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/12 shadow-none"
                    }`}
                  >
                    {isComplete ? "Review Course" : course.enrolled ? "Continue Learning" : "View Course"}
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
