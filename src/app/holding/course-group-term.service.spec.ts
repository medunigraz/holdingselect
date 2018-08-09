import { TestBed, inject } from "@angular/core/testing";

import { CourseGroupTermService } from "./course-group-term.service";

describe("CourseGroupTermService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseGroupTermService]
    });
  });

  it("should be created", inject(
    [CourseGroupTermService],
    (service: CourseGroupTermService) => {
      expect(service).toBeTruthy();
    }
  ));
});
