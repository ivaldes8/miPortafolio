import { Component, OnInit } from '@angular/core';
import { GenericService } from '../../services/generic.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.scss']
})
export class HabilidadesComponent implements OnInit {
  dataDesign: any[] = []
  dataLanguage: any[] = []
  dataFramework: any[] = []
  dataOther: any[] = []
  loading = false

  constructor(private genericService: GenericService, private toast: ToastrService) { }

  async ngOnInit() {
    await this.fetchData()
    console.log(this.dataDesign, 'Data D')
    console.log(this.dataLanguage, 'Data L')
    console.log(this.dataFramework, 'Data F')
    console.log(this.dataOther, 'Data O')
  }

  async fetchData() {
    this.toggleLoading()
    await this.genericService.getAboutMe()
    .then((data) => {
      this.dataDesign = data['skills']['design']
      this.dataLanguage = data['skills']['languages']
      this.dataFramework = data['skills']['frameworks']
      this.dataOther = data['skills']['oder']
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
