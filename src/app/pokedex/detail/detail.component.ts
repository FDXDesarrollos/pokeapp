import { ActivatedRoute } from '@angular/router';
import { PokedexService } from './../../shared/pokedex.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  pokemon: any = '';
  pokemonType = [];
  pokemonImg: any = '';

  constructor(private activatedRoute: ActivatedRoute,
              private pokedexService: PokedexService) {
    this.activatedRoute.params.subscribe( params => {this.getPokemon(params['id'])});
  }

  ngOnInit(): void {
  }

  getPokemon(id: any): any{
    this.pokedexService.getPokemon(id).subscribe({
      next: (resp) => {
        //console.log(resp);
        this.pokemon = resp;
        this.pokemonImg = resp.sprites.front_default;
        this.pokemonType = resp.types[0].type.name;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
