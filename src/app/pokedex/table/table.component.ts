import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { PokedexService } from './../../shared/pokedex.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  data: any[] = [];
  displayedColumns: string[] = ['position', 'image', 'name'];
  dataSource = new MatTableDataSource<any>(this.data);
  pokemons = [];
  
  @ViewChild(MatSort, {static: false}) 
  sort!: MatSort;
  @ViewChild(MatPaginator, {static: false}) 
  paginator!: MatPaginator;

  constructor(private router: Router,
              private pokedexService: PokedexService) { }

  ngOnInit(): void {
    //this.dataSource.data = this.dataList;
    this.getPokemons();
  }
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; // For pagination
    this.dataSource.sort = this.sort; // For sort
  }

  getPokemons(){
    let pokemonData;

    for(let index = 1; index <= 150; index++){
      this.pokedexService.getPokemon(index.toString()).subscribe({
        next: (resp) => {
          pokemonData = {
            position: index,
            image: resp.sprites.front_default,
            name: resp.name
          }
          this.data.push(pokemonData);
          this.dataSource = new MatTableDataSource<any>(this.data);
          this.dataSource.paginator = this.paginator;
          //console.log(resp);
        },
        error: (err) => {
          console.error(err.error);
        }
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getRow(row: any): void{
    //console.log(row);
    this.router.navigateByUrl(`detail/${row.position}`);
  }
}
