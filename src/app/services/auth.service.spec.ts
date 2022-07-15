import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should detect invalid username', () => {
    const invalid = [0, 'Username must contain only letters and numbers'];
    const valid = [-1, ''];
    
    let result = service.register('a1b2c3d4e5', '', '');
    expect(result).toEqual(valid);

    result = service.register('', '', '');
    expect(result).toEqual(invalid);


    result = service.register('a1b2c3d4e5!', '', '');
    expect(result).toEqual(invalid);

    result = service.register('#asbvsajhgdhj', '', '');
    expect(result).toEqual(invalid);

    result = service.register('DROP * FROM cars;', '', '');
    expect(result).toEqual(invalid);

    result = service.register('a b', '', '');
    expect(result).toEqual(invalid);
  });
});
