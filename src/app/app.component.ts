import { Component, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from './theme/theme.service';
import { SwUpdate } from '@angular/service-worker';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from './services/language.service';
import { GenericService } from './services/generic.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'Portafolio';

  isCollapsed = true;
  customClass = 'active';
  toggleSidebar = false;
  collapsed = true;
  public isMenuCollapsed = true;

  projects: any[] = []
  skillDesign: any[] = []
  skillLanguage: any[] = []
  skillFramework: any[] = []
  skillOther: any[] = []
  idioms: any[] = [
    {title: 'Ingles: B2'},
    {title: 'Español: Nativo'}
  ]
  educations: any[] = [
    {
      name: 'Enseñanza Primaria',
      school: 'Patricio Lumumba',
      year: '2001-2008'
    },
    {
      name: 'Enseñanza Media',
      school: 'José Antonio Echeverría Bianchi',
      year: '2008-2011'
    },
    {
      name: 'Enseñanza Media-Superior',
      school: 'IPU Jesús Suárez Gayol',
      year: '2011-2014'
    },
    {
      name: 'Enseñanza Superior',
      school: 'Universidad de las Ciencias Informáticas',
      year: '2015-2020'
    }
  ]
  loading = false

  toggle(){
    this.toggleSidebar = !this.toggleSidebar;
    if (this.toggleSidebar){
      this.customClass = 'active';
    } else {
      this.customClass = '';
    }
  }

  constructor(private translate: TranslateService, private themeService: ThemeService, private swUpdate: SwUpdate, private languageService: LanguageService, private genericService: GenericService, private toast: ToastrService){
    translate.setDefaultLang('es');
    this.languageService.setItem('language', 'es')
  }


  async ngOnInit(){
    await this.fetchData()
    if (this.swUpdate.isEnabled) {

      this.swUpdate.available.subscribe(() => {

          if(confirm("New version available. Load New Version?")) {

              window.location.reload();
          }
      });

  }

  this.themeService.setBlueTheme();

}

  selectedLanguage(event:any){
    this.translate.use(event.target.value);
    this.languageService.setItem('language', event.target.value)
  }

  selectTheme(event){
    if(event.target.text == "Dark" || event.target.text == "Oscuro"){
      this.themeService.setDarkTheme();
    }
    if(event.target.text == "Blue" || event.target.text == "Azul"){
      this.themeService.setBlueTheme();
    }
    if(event.target.text == "Ligth" || event.target.text == "Blanco"){
      this.themeService.setLightTheme();
    }
  }

  async fetchData() {
    this.toggleLoading()
    await this.genericService.getAboutMe()
    .then((data) => {
      this.projects = data['projects']
      this.skillDesign = data['skills']['design']
      this.skillLanguage = data['skills']['languages']
      this.skillFramework = data['skills']['frameworks']
      this.skillOther = data['skills']['oder']
    })
    .catch((error) => {
      console.log(error, 'ERROR')
      this.toast.error('Error while getting data, check you internet connection')
    });
    this.toggleLoading()
  }

  toggleLoading() {
    this.loading = !this.loading
  }

  generatePdf(action = 'open') {
    console.log(pdfMake);
    const documentDefinition = this.getDocumentDefinition();

    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;

      default: pdfMake.createPdf(documentDefinition).open(); break;
    }

  }

  getDocumentDefinition() {
    return {
      content: [
        {
          text: 'Currículum',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            [{
              text: 'Iván González Valdés',
              link: 'https://ivaldes8.github.io/miPortafolio/',
              color: 'blue',
              style: 'name'
            },
            {
              text: 'Avenida 51 #10614 E/Calle 106 y Calle 108'
            },
            {
              text: 'Email : ' + 'kaosolution8@gmail.com',
            },
            {
              text: 'Contant No : ' + '+535-8478592',
            },
            {
              text: 'Linkedin: ' + 'ivaldes199622',
              link: 'https://www.linkedin.com/in/ivaldes199622/',
              color: 'blue',
            },
            {
              text: 'GitHub: ' + 'ivaldes8',
              link: 'https://github.com/ivaldes8',
              color: 'blue',
            }
            ],
            [
              this.getProfilePicObject()
            ]
          ]
        },

        {
          text: 'Projectos',
          style: 'header'
        },
        this.getExperienceObject(this.projects),
        {
          text: 'Idiomas',
          style: 'header'
        },
        {
          columns : [
            {
              ul : this.idioms.map(i => i.title)
            },
          ]
        },
        {
          text: 'Habilidades',
          style: 'header'
        },
        {
          columns : [
            {
              ul : this.skillDesign.map(s => s.tittle)
            },
            {
              ul : this.skillFramework.map(s => s.tittle)
            },
            {
              ul : this.skillLanguage.map(s => s.tittle)
            },
            {
              ul : this.skillOther.map(s => s.tittle)
            }
          ]
        },
        {
          text: 'Education',
          style: 'header'
        },
        this.getEducationObject(),
        {
          text: 'Other Details',
          style: 'header'
        },
        {
          text: 'Soy un Ingeniero en Ciencias Informáticas especializado en el desarrollo web'
        },
        {
          text: 'Signature',
          style: 'sign'
        },
        {
          columns : [
              { qr: 'Iván González Valdés' + ', Contact No : ' + '+535-8478592', fit : 100 },
              {
              text: `(Iván González Valdés)`,
              alignment: 'right',
              }
          ]
        }
      ],
      images: {
        profileImage: {
          // url: 'http://127.0.0.1:4200/assets/IGV.png'
          url: 'https://ivaldes8.github.io/miPortafolio/assets/IGV.png'
        }
      },
      info: {
        title: 'Iván González Valdés' + '_RESUME',
        author: 'Iván González Valdés',
        subject: 'RESUME',
        keywords: 'RESUME, ONLINE RESUME',
      },
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 20, 0, 10],
            decoration: 'underline'
          },
          name: {
            fontSize: 16,
            bold: true
          },
          jobTitle: {
            fontSize: 14,
            bold: true,
            italics: true
          },
          sign: {
            margin: [0, 50, 0, 10],
            alignment: 'right',
            italics: true
          },
          tableHeader: {
            bold: true,
          }
        }
    };
  }

  getProfilePicObject() {
      return {
        image: 'profileImage' ,
        width: 75,
        alignment : 'right'
      };
  }

  getExperienceObject(experiences) {

    const exs = [];
    experiences.forEach(experience => {
      exs.push(
        [{
          columns: [
            [{
              text: experience.name,
              link: experience.link ? experience.link : 'https://ivaldes8.github.io/miPortafolio/',
              color: 'blue',
              style: 'jobTitle'
            },
            {
              text: experience.textEs,
            }],
          ]
        }]
      );
    });

    console.log(exs, 'exs')

    return {
      table: {
        widths: ['*'],
        body: [
          ...exs
        ]
      }
    };
  }

  getEducationObject() {
    return {
      table: {
        widths: ['*', '*', '*', '*'],
        body: [
          [{
            text: 'Enseñanza',
            style: 'tableHeader'
          },
          {
            text: 'Nombre',
            style: 'tableHeader'
          },
          {
            text: 'Años',
            style: 'tableHeader'
          },
          ],
          ...this.educations.map(ed => {
            return [ed.name, ed.school, ed.year];
          })
        ]
      }
    };
  }

}
