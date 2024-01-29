import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from "./home.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MarvelApiService } from "../services/marvelApi.service";
import { firstValueFrom } from "rxjs";

describe('Home Test', () => {

    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
          imports: [HttpClientModule, HomeComponent],
          declarations: [],
          providers: [],
        }).compileComponents();
    
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
    
        //Atualizar a detecção de mudanças
        fixture.detectChanges();
    
      });
      
      it('Should contain title', () => {
        cy.contains('EXPLORE O UNIVERSO');
      });

      it('Should search a character', () => {
    
        cy.intercept('POST', '/auth', {}).then(async () => {
    
          const marvelService = TestBed.inject(MarvelApiService);
    
          const res = await firstValueFrom(
            marvelService.getByQuery('spider-girl')
          );

          expect(res).to.be.an('array').that.is.not.empty;

        });
    
      });

});