import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DownloadService } from "./api.service";

@NgModule({
  imports: [CommonModule],
  declarations: [DownloadService]
})
export class ApiModule {}
