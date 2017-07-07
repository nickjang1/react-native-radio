//
//  UIImage+EM.h
//  RadioProject
//
//  Created by softblade on 07/07/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface UIImage (EM)
+ (UIImage *)imageNamed:(NSString *)name fill:(CGSize)size;
- (UIImage*)imageByScalingAndCroppingForSize:(CGSize)size;
@end
