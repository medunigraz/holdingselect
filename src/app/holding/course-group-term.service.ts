import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { APIClient, Item } from "../api/api.service";

enum Semester {
  S = "S",
  W = "W"
}

interface Course {
  id: number;
  name: string;
  category: string;
  year: string;
  semester: Semester;
}

interface CourseGroup {
  id: number;
  course: Course;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface Floor {
  id: number;
  name: string;
}

interface Building {
  id: number;
  name: string;
  short: string;
  address: string;
}

interface Room {
  id: number;
  category: Category;
  floor: Floor;
  building: Building | null;
  title: string;
  name_short: string;
  name_full: string;
  organization: number;
}

export interface CourseGroupTerm extends Item {
  id: string;
  coursegroup: CourseGroup | null;
  person: any | null;
  start: Date;
  end: Date;
  room: Room | null;
  title: string | null;
  term: number;
}

@Injectable()
export class CourseGroupTermService extends APIClient<CourseGroupTerm> {
  path = "campusonline/course-group-term/";

  constructor(http: HttpClient) {
    super(http);
  }
}
