import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ChecktokenService} from "../checktoken.service";

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {

  check : FormGroup= new FormGroup({
    name: new FormControl()
  })

  ngSubmit(){
    const c = this.check.value;
    console.log(c);
    this.checkService.checkToken(c).subscribe(a=>{
      console.log(a);
    });
  }
  constructor(private checkService: ChecktokenService) { }

  ngOnInit(): void {
  }

}
