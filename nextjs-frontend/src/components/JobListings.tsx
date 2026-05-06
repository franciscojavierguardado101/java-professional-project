'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import JobCard from '@/components/JobCard';
import { Job, JobType, ExperienceLevel } from '@/types';

interface Props {
  initialJobs: Job[];
}

const ALL = 'ALL';

export default function JobListings({ initialJobs }: Props) {
  const [search, setSearch] = useState('');
  const [jobType, setJobType] = useState(ALL);
  const [level, setLevel] = useState(ALL);

  const filtered = useMemo(() => {
    return initialJobs.filter((job) => {
      const term = search.toLowerCase();
      const matchesSearch =
        !term ||
        job.title.toLowerCase().includes(term) ||
        job.companyName.toLowerCase().includes(term) ||
        (job.location ?? '').toLowerCase().includes(term) ||
        job.description.toLowerCase().includes(term);

      const matchesType = jobType === ALL || job.jobType === jobType;
      const matchesLevel = level === ALL || job.experienceLevel === level;

      return matchesSearch && matchesType && matchesLevel;
    });
  }, [initialJobs, search, jobType, level]);

  function clearFilters() {
    setSearch('');
    setJobType(ALL);
    setLevel(ALL);
  }

  const isFiltered = search !== '' || jobType !== ALL || level !== ALL;

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          placeholder="Search by title, company, or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
        <Select value={jobType} onValueChange={(v) => setJobType(v ?? ALL)}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Job Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All Types</SelectItem>
            <SelectItem value={'FULL_TIME' as JobType}>Full Time</SelectItem>
            <SelectItem value={'PART_TIME' as JobType}>Part Time</SelectItem>
            <SelectItem value={'CONTRACT' as JobType}>Contract</SelectItem>
            <SelectItem value={'FREELANCE' as JobType}>Freelance</SelectItem>
            <SelectItem value={'INTERNSHIP' as JobType}>Internship</SelectItem>
          </SelectContent>
        </Select>
        <Select value={level} onValueChange={(v) => setLevel(v ?? ALL)}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All Levels</SelectItem>
            <SelectItem value={'ENTRY' as ExperienceLevel}>Entry</SelectItem>
            <SelectItem value={'MID' as ExperienceLevel}>Mid</SelectItem>
            <SelectItem value={'SENIOR' as ExperienceLevel}>Senior</SelectItem>
            <SelectItem value={'LEAD' as ExperienceLevel}>Lead</SelectItem>
            <SelectItem value={'EXECUTIVE' as ExperienceLevel}>Executive</SelectItem>
          </SelectContent>
        </Select>
        {isFiltered && (
          <Button variant="ghost" onClick={clearFilters} className="text-slate-500">
            Clear
          </Button>
        )}
      </div>

      {/* Results count */}
      <p className="text-sm text-slate-500">
        {filtered.length} {filtered.length === 1 ? 'job' : 'jobs'} found
        {isFiltered && ' — filtered'}
      </p>

      {/* Job grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          No jobs match your search. Try adjusting your filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
