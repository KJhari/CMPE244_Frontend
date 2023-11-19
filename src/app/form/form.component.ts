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
  sucess?: boolean;
}

interface ApiResponse {
  message?: string;
  data?: any; // Define more specifically if you know the structure
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
      Frequency: ['', [Validators.required, Validators.min(200), Validators.max(1500)]],
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
        this.isSuccess = response.sensor_data?.sucess ?? false;
        if (this.isSuccess && response.sensor_data) {
          this.sensorData = response.sensor_data;
          this.responseMessage = 'Success: ' + response.message;
        } else {
          this.responseMessage = 'Failure: ' + response.message;
          this.sensorData = null;
        }
      },
      error => {
        this.isSuccess = false;
        this.responseMessage = 'Error: ' + error;
        this.sensorData = null;
      }
    );
  }
}