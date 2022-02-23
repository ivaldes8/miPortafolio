import { Component, OnInit } from '@angular/core';
import { GenericService } from '../../services/generic.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language.service';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  data: any[] = []
  loading = false
  lang = 'es'

  constructor(private genericService: GenericService, private toast: ToastrService, private languageService: LanguageService) { }

  async ngOnInit() {
    await this.fetchData()
    this.languageService.watchStorage().subscribe((data: string) => {
      this.lang = localStorage.getItem('language')
    })
  }

  async fetchData() {
    this.toggleLoading()
    await this.genericService.getAboutMe()
    .then((data) => {
      this.data = data['projects']
    })
    .catch((error) => {
      console.log(error, 'ERROR')
      this.toast.error('Error while getting projects data, check you internet connection')
    });
    this.toggleLoading()
  }

  toggleLoading() {
    this.loading = !this.loading
  }

}
