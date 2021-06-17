import { TestBed, waitForAsync } from '@angular/core/testing';

import { ApiService } from './api.service';

import { HttpClientTestingModule,
  HttpTestingController } from '@angular/common/http/testing';

const mockDataPosts = [
  {
    id: 1,
    name:"Post1"
  },
  {
    id: 2,
    name:"Post2"
  },
  {
    id: 3,
    name:"Post3"
  }
]


describe('ApiService', () => {
  let service: ApiService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule]
    });
    service = TestBed.inject(ApiService);
    controller = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    controller.verify();
});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have listPosts method', () => {
    expect(service.listPosts).toBeDefined();
  });


  it(' method listPosts should return observable and call url with right http method', waitForAsync(() => {
    let postsData: any[];
    service.listPosts().subscribe((posts: any[])=> {
      postsData = posts
    })

    const req = controller.expectOne('https://jsonplaceholder.typicode.com/posts')
    expect(req.request.method).toEqual('GET')
    req.flush(mockDataPosts)
    expect(postsData.length).toEqual(3)
    expect(postsData[0].id).toEqual(1)
  }));
});
