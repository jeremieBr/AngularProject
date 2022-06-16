import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  stockForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.stockForm = this.fb.group({
      stockName: [
        "",
        [Validators.required, Validators.minLength(1), Validators.maxLength(5)],
      ],
    });
  }

  get stockName() {
    return this.stockForm.get("stockName");
  }

  public addStock(): void {
    if (this.stockForm.valid) {
    }
  }
}
