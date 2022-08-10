import { Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ProjectService } from './../../services/project.service';
import { Project } from '../../shared/models/project.interface';

@Component({
  selector: 'app-grid-list',
  templateUrl: './grid-list.component.html',
  styleUrls: ['./grid-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridListComponent implements OnInit {
  constructor(private _projectService: ProjectService) {}

  projects$: Observable<Project[]>;

  ngOnInit() {
    this._projectService
      .getProjects()
      .subscribe((projects) => (this._projectService.projectsValue = projects));
    this.projects$ = this._projectService.projects$;
  }
}
