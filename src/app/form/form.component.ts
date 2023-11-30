import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

interface SensorData {
  accelerometer: {
    x: number;
    y: number;
    z: number;
  };
  magnetometer: {
    x: number;
    y: number;
    z: number;
  };
  angle_yz: number;
  heading: number;
}

interface ApiResponse {
  message?: string;
  error?: string;  // Make sure to include this for error handling
  data?: any;
  sensor_data?: SensorData;
}
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  myForm: FormGroup;
  responseMessage: string;
  sensorData: SensorData | null = null;
  isSuccess: boolean = false; // New property to track success status

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.myForm = this.fb.group({
      Frequency: ['', [Validators.required, Validators.min(200), Validators.max(1000)]],
      Duty_Cycle: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      Direction: ['', Validators.required],
      Time: ['',[Validators.min(2), Validators.max(10)]],
      Degree: ['',[Validators.min(0), Validators.max(360)]]
    });
    this.responseMessage = "";
  }

  ngOnInit(): void {
    this.setupFormControls();
  }

  setupFormControls(): void {
    // Use optional chaining when subscribing to valueChanges
    this.myForm.get('Time')?.valueChanges.subscribe(timeValue => {
      if (timeValue) {
        // Use non-null assertion for actions like enable or disable
        // It tells TypeScript that you're certain the object is non-null
        this.myForm.get('Degree')!.disable();
      } else {
        this.myForm.get('Degree')!.enable();
      }
    });

    this.myForm.get('Degree')?.valueChanges.subscribe(degreeValue => {
      if (degreeValue) {
        this.myForm.get('Time')!.disable();
      } else {
        this.myForm.get('Time')!.enable();
      }
    });

  }

  // ... rest of your component

  onSubmit() {
    this.apiService.submitForm(this.myForm.value).subscribe(
      (response: ApiResponse) => {
        if (response.error) {
          // Error handling
          this.isSuccess = false;
          this.responseMessage = 'Error: ' + response.error;
          this.sensorData = null;
        } else {
          // Success handling
          this.isSuccess = true;
          this.responseMessage = response.message || 'Success';
          this.sensorData = response.sensor_data || null;
        }
      },
      error => {
        // Network or other technical error handling
        this.isSuccess = false;
        this.responseMessage = 'Technical error: ' + error.message;
        this.sensorData = null;
      }
    );
  }
  
}