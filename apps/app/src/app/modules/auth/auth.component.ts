import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'swap-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.form.value);
    if (this.form.valid) {
      this.http
        .post('/api/auth/login', this.form.value)
        .subscribe((response) => console.log(response));
    }
  }
}
