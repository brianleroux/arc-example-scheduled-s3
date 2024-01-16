export let deploy = {

  async start ({ cloudformation }) {

    // add a private static bucket
    cloudformation.Resources.PrivateBucket = {
      Type: 'AWS::S3::Bucket',
      DeletionPolicy: 'Delete',
      Properties: {
        PublicAccessBlockConfiguration: {
          BlockPublicAcls: false,
          BlockPublicPolicy: false,
          IgnorePublicAcls: false,
          RestrictPublicBuckets: false
        },
        BucketEncryption: {
          ServerSideEncryptionConfiguration: [{
            ServerSideEncryptionByDefault: {
              SSEAlgorithm: 'AES256'
            }
          }]
        }
      }
    }

    // ensure all Lambda functions in this stack can access the bucket
    // TODO: copy this to add extra permisions to other resources/stacks
    cloudformation.Resources.PrivateBucketPolicy = {
      Type: 'AWS::IAM::Policy',
      Properties: {
        PolicyName: 'PrivateBucketPolicy',
        PolicyDocument: {
          Statement: [{
            Effect: 'Allow',
            Action: ['s3:*'],
            Resource: [{
              'Fn::Sub': [
                'arn:aws:s3:::${bucket}',
                { bucket: { Ref: 'PrivateBucket' } }
              ]
            }, {
              'Fn::Sub': [
                'arn:aws:s3:::${bucket}/*',
                { bucket: { Ref: 'PrivateBucket' } }
              ]
            }]
          }]
        },
        Roles: [ { 'Ref': 'Role' } ],
      }
    }

    // Add name to SSM for runtime discovery
    cloudformation.Resources.PrivateBucketParam = {
      Type: 'AWS::SSM::Parameter',
      Properties: {
        Type: 'String',
        Name: {
          'Fn::Sub': ['/${AWS::StackName}/private/bucket', {}]
        },
        Value: { Ref: 'PrivateBucket' }
      }
    }

    return cloudformation
  }
}
