import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NSExpressionEvaluatorAngular } from 'ns-components-angular';

@Component({
  selector: 'app-expression-evaluator',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './expression-evaluator.component.html',
  styleUrl: './expression-evaluator.component.scss'
})
export class ExpressionEvaluatorComponent implements OnInit {
  expressionForm: FormGroup;
  result: string = '';
  evaluator: any;

  constructor(private fb: FormBuilder) {
    this.expressionForm = this.fb.group({
      expression: [
        "persons[0].person1.age > 20 && gender === 'M'",
        Validators.required,
      ],
      model: [
        '{"age": 20,"gender": "M", "persons": [{"person1": {"age": 21},"gender": "M"}]}',
        Validators.required,
      ],
      throwErrorForUndefined: [true],
    });
  }

  ngOnInit(): void {
    this.evaluator = new NSExpressionEvaluatorAngular({
      throwErrorForUndefined: this.expressionForm.value.throwErrorForUndefined,
    });
  }

  onSubmit(): void {
    if (this.expressionForm.invalid) {
      alert('Please fill in all fields correctly.');
      return;
    }

    const { expression, model, throwErrorForUndefined } = this.expressionForm.value;

    let jsonData: any;
    try {
      jsonData = JSON.parse(this.toValidJSON(model));
      jsonData.getData = (age: number, gender: string) => {
        console.log('In getData ', age, gender);
        return `Age is ${age} for Gender ${gender}`;
      };
    } catch (e) {
      console.error(e);
      alert('Please enter a valid JSON Model/Data');
      return;
    }

    try {
      const evalResult = this.evaluator.evaluate(expression, jsonData);
      console.log(evalResult);
      this.result = '' + evalResult;
    } catch (e) {
      console.error(e);
      alert('Error Occurred: ' + e);
    }
  }

  private toValidJSON(str: string): string {
    const processedStr = str.replace(/(\w+)(?=:)/g, '"$1"');
    console.log(processedStr);
    return processedStr;
  }
}
