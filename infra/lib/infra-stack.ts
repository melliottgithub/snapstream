import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as targets from 'aws-cdk-lib/aws-route53-targets';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'Vpc', { maxAzs: 2 });

    const instance = new ec2.Instance(this, 'Instance', {
      vpc,
      instanceType: new ec2.InstanceType('t2.micro'),
      machineImage: new ec2.AmazonLinuxImage({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      }),
    });

    const certificate = new acm.Certificate(this, 'Certificate', {
      domainName: 'snapstream.devmellio.com',
      validation: acm.CertificateValidation.fromDns(),
    });

    const distribution = new cloudfront.CloudFrontWebDistribution(this, 'Distribution', {
      originConfigs: [
        {
          customOriginSource: {
            domainName: instance.instancePublicDnsName,
            originProtocolPolicy: cloudfront.OriginProtocolPolicy.HTTP_ONLY,
          },
          behaviors: [{ isDefaultBehavior: true }],
        },
      ],
      viewerCertificate: {
        aliases: ['example.com'],
        props: {
          acmCertificateArn: certificate.certificateArn,
          sslSupportMethod: cloudfront.SSLMethod.SNI,
        },
      },
    });

    const zone = route53.HostedZone.fromLookup(this, 'HostedZone', { domainName: 'example.com' });

    new route53.ARecord(this, 'AliasRecord', {
      zone,
      recordName: 'example.com',
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
    });
  }
}
